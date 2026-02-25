import requests
import json

USERNAME = "prafulgulani"
URL = "https://leetcode.com/graphql"

QUERIES = {
    "Solved_and_Contest": """
    query userStats($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal { acSubmissionNum { difficulty count } }
      }
      userContestRanking(username: $username) {
        rating globalRanking topPercentage attendedContestsCount
      }
    }
    """,
    "Language_Stats": """
    query languageStats($username: String!) {
      matchedUser(username: $username) {
        languageStats { languageName problemsSolved }
      }
    }
    """,
    "Topic_Tags": """
    query userTags($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced { tagName problemsSolved }
          intermediate { tagName problemsSolved }
          fundamental { tagName problemsSolved }
        }
      }
    }
    """,
    "Activity_Calendar": """
    query userCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          activeYears
          streak
          totalActiveDays
        }
      }
    }
    """
}

def explore():
    headers = {"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"}
    all_results = {}

    for name, query in QUERIES.items():
        payload = {"query": query, "variables": {"username": USERNAME}}
        try:
            response = requests.post(URL, json=payload, headers=headers)
            res_data = response.json()
            all_results[name] = res_data.get("data", res_data.get("errors"))
        except Exception as e:
            all_results[name] = str(e)

    print(json.dumps(all_results, indent=2))

if __name__ == "__main__":
    explore()