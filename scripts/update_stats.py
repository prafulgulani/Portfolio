import requests
import json
import os

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

def main():
    stats = get_leetcode_stats("prafulgulani")
    
    profile = {
        "name": "Praful Gulani",
        "role": "Junior Software Developer at Deepiotics",
        "location": "Indore, India",
        "leetcode": stats,
        "education": "BSc Computer Science, Goldsmiths, University of London",
        "interests": ["AI Agents", "Generative Systems", "Open Source", "Machine Learning"]
    }

    os.makedirs('app/data', exist_ok=True)
    with open('app/data/profile.json', 'w') as f:
        json.dump(profile, f, indent=2)
    print("✅ Profile updated: High-level LeetCode stats only.")

if __name__ == "__main__":
    main()