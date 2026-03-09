import requests
import json
import os
from datetime import datetime


# CONFIGURATION
USERNAME = "prafulgulani"
WHITELIST = ["matplotlib", "django"]
PROFILE_PATH = 'app/data/profile.json'

# GitHub Token from Environment Variables
TOKEN = os.getenv('MY_GITHUB_TOKEN')
HEADERS = {"Authorization": f"token {TOKEN}"} if TOKEN else {}

def fetch_incremental_os(last_run_date):
    contributions = []
    # Search for PRs in whitelist orgs updated since last_run_date
    # Includes both merged and open (in-review) PRs
    query = f"author:{USERNAME} " + " ".join([f"org:{org}" for org in WHITELIST]) + f" updated:>{last_run_date}"
    url = f"https://api.github.com/search/issues?q={query}"
    
    try:
        response = requests.get(url, headers=HEADERS)
        items = response.json().get('items', [])
        
        for item in items:
            # Determine status
            status = "in-review"
            if item.get('pull_request', {}).get('merged_at'):
                status = "merged"
            elif item['state'] == 'closed':
                status = "closed"

            contributions.append({
                "id": item['id'],
                "org": item['repository_url'].split('/')[-2], # Extracts org name
                "repo": item['repository_url'].split('/')[-1],
                "title": item['title'],
                "status": status,
                "date": item['created_at'].split('T')[0],
                "url": item['html_url'],
                "description": ["to be added"] 
            })
    except Exception as e:
        print(f"Error fetching GitHub data: {e}")
    return contributions

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
    profile["last_os_update"] = datetime.now().strftime("%Y-%m-%d")

    # 4. Save
    os.makedirs(os.path.dirname(PROFILE_PATH), exist_ok=True)
    with open(PROFILE_PATH, 'w') as f:
        json.dump(profile, f, indent=2)
    print(f"✅ Success! Profile updated at {PROFILE_PATH}")
    
if __name__ == "__main__":
    main()