import requests
import json
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# CONFIGURATION
USERNAME = "prafulgulani"
WHITELIST = ["matplotlib", "django"]
PROFILE_PATH = 'app/data/profile.json'

# GitHub Token from Environment Variables
TOKEN = os.getenv('MY_GITHUB_TOKEN')
HEADERS = {"Authorization": f"token {TOKEN}"} if TOKEN else {}

def fetch_incremental_os(last_run_date):
    all_contributions = []
    
    for org in WHITELIST:
        # 1. Search one org at a time
        query = f"author:{USERNAME} org:{org} is:pr updated:>{last_run_date}"
        url = f"https://api.github.com/search/issues?q={query}"
        
        print(f"Fetching {org}...")
        try:
            response = requests.get(url, headers=HEADERS)
            items = response.json().get('items', [])
            
            for item in items:
                # 2. Get the detail URL
                pr_detail_url = item.get('pull_request', {}).get('url')
                status = "in-review"
                
                if pr_detail_url:
                    detail_resp = requests.get(pr_detail_url, headers=HEADERS)
                    detail_data = detail_resp.json()
                    
                    # 3. Check for the definitive 'merged' boolean
                    if detail_data.get('merged'):
                        status = "merged"
                    elif item['state'] == 'closed':
                        status = "closed"

                all_contributions.append({
                    "id": item['id'],
                    "org": org,
                    "repo": item['repository_url'].split('/')[-1],
                    "title": item['title'],
                    "status": status,
                    "date": item['created_at'].split('T')[0],
                    "url": item['html_url'],
                    "description": ["to be added"] 
                })
        except Exception as e:
            print(f"Error fetching {org}: {e}")
            
    return all_contributions

def get_leetcode_stats(username):
    url = "https://leetcode.com/graphql"
    
    # Query: Contest stats and Solved counts only
    query = """
    query userData($username: String!) {
      userContestRanking(username: $username) {
        rating
        topPercentage
      }
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
    """
    
    variables = {"username": username}
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(url, json={'query': query, 'variables': variables}, headers=headers)
        res_data = response.json()
        
        data = res_data['data']
        contest = data['userContestRanking']
        user = data['matchedUser']
        solved_stats = user['submitStatsGlobal']['acSubmissionNum']
        
        return {
            "contestRating": round(contest['rating']) if contest else 1673,
            "percentile": contest['topPercentage'] if contest else 15.31,
            "totalSolved": solved_stats[0]['count'],
            "easySolved": solved_stats[1]['count'],
            "mediumSolved": solved_stats[2]['count'],
            "hardSolved": solved_stats[3]['count']
        }
    except Exception as e:
        print(f"Error fetching LeetCode data: {e}")
        return {"error": "Could not fetch stats"}

def merge_data(existing_os, new_os):
    os_map = {item['id']: item for item in existing_os}
    
    for item in new_os:
        if item['id'] in os_map:
            # Update status and title, but PRESERVE existing manual description
            existing_desc = os_map[item['id']].get('description', ["to be added"])
            if existing_desc != ["to be added"]:
                item['description'] = existing_desc
            os_map[item['id']] = item
        else:
            # Brand new contribution
            os_map[item['id']] = item
            
    # Sort by date descending
    return sorted(os_map.values(), key=lambda x: x['date'], reverse=True)

def main():
    # 1. Load Existing Profile
    if os.path.exists(PROFILE_PATH):
        with open(PROFILE_PATH, 'r') as f:
            profile = json.load(f)
    else:
        profile = {
            "name": "Praful Gulani",
            "role": "Junior Software Developer",
            "location": "Indore, India",
            "education": "B.Sc. in Computer Science, Goldsmiths, University of London",
            "leetcode": {},
            "interests": [
              "AI Agents",
              "Generative Systems",
              "Open Source",
              "Machine Learning"
            ],
            "last_os_update": "2021-01-01",
            "openSource": [],
            "experience": [
                {
                "company": "Deepiotics",
                "role": "Junior Software Developer",
                "period": "Feb 2026 - Present",
                "achievements": [
                    "Developed high-performance web scrapers using Python and ScraperAPI to automate data collection.",
                    "Built and optimized customer churn prediction models using Machine Learning to provide actionable business insights.",
                    "Designed and deployed responsive chatbot interfaces."
                ]
                }
            ]
        }

    # 2. Update LeetCode
    print("Fetching LeetCode stats...")
    profile["leetcode"] = get_leetcode_stats(USERNAME)

    # 3. Update Open Source (Incremental)
    # This avoids the KeyError by providing a default date if the key is missing
    last_update = profile.get('last_os_update', '2021-01-01')
    print(f"Fetching OS contributions since {last_update}...")

    new_os = fetch_incremental_os(last_update)
    profile["openSource"] = merge_data(profile.get("openSource", []), new_os)

    # 4. SMART DATE LOGIC (The "Oldest Open PR" strategy)
    # Filter for items that aren't merged or closed yet
    open_prs = [item for item in profile["openSource"] if item["status"] == "in-review"]
    
    if open_prs:
        # Find the oldest date among open PRs and subtract 1 day for safety
        oldest_date_str = min(item["date"] for item in open_prs)
        oldest_date = datetime.strptime(oldest_date_str, "%Y-%m-%d") - timedelta(days=1)
        profile["last_os_update"] = oldest_date.strftime("%Y-%m-%d")
        print(f"Next run will check from {profile['last_os_update']} to monitor open PRs.")
    else:
        # If no open PRs, move the checkpoint to today
        profile["last_os_update"] = datetime.now().strftime("%Y-%m-%d")
        print("All PRs up to date. Checkpoint moved to today.")

    # 5. Save
    os.makedirs(os.path.dirname(PROFILE_PATH), exist_ok=True)
    with open(PROFILE_PATH, 'w') as f:
        json.dump(profile, f, indent=2)
    print(f"✅ Success! Profile updated at {PROFILE_PATH}")
    
if __name__ == "__main__":
    main()