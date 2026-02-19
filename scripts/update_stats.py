import requests
import json
import os

def get_leetcode_stats(username):
    url = "https://leetcode.com/graphql"
    query = """
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
    }
    """
    variables = {"username": username}
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(url, json={'query': query, 'variables': variables}, headers=headers)
        res_data = response.json()
        
        # Digging through the nested JSON response
        user_data = res_data['data']['matchedUser']
        stats = user_data['submitStats']['acSubmissionNum']
        
        return {
            "totalSolved": stats[0]['count'],
            "easySolved": stats[1]['count'],
            "mediumSolved": stats[2]['count'],
            "hardSolved": stats[3]['count'],
            "ranking": user_data['profile']['ranking']
        }
    except Exception as e:
        print(f"Error fetching LeetCode data: {e}")
        return {"error": "Could not fetch stats"}

def main():
    # Gather all your info
    profile = {
        "name": "Praful Gulani",
        "role": "Junior Software Developer at Deepiotics",
        "location": "Indore, India",
        "leetcode": get_leetcode_stats("prafulgulani"),
        "education": "BSc Computer Science, Goldsmiths, University of London (Distance Learning)",
        "skills": ["Python", "Machine Learning", "Django", "Next.js"]
    }

    # Save it to the app's data folder so the Chatbot can see it
    os.makedirs('app/data', exist_ok=True)
    with open('app/data/profile.json', 'w') as f:
        json.dump(profile, f, indent=2)
    print("Profile data updated successfully!")

if __name__ == "__main__":
    main()