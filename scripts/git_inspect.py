import requests
import os
import json
from datetime import datetime, timedelta

# CONFIGURATION
USERNAME = "prafulgulani"
WHITELIST = ["matplotlib", "django"]
TOKEN = os.getenv('MY_GITHUB_TOKEN')
HEADERS = {"Authorization": f"token {TOKEN}"} if TOKEN else {}

def inspect_github_api():
    # Looking back 6 months for a full audit
    six_months_ago = (datetime.now() - timedelta(days=180)).strftime("%Y-%m-%d")
    
    for org in WHITELIST:
        # Added is:pr to keep it strictly to Pull Requests
        query = f"author:{USERNAME} org:{org} is:pr updated:>{six_months_ago}"
        url = f"https://api.github.com/search/issues?q={query}"
        
        print(f"\n--- 🔍 Audit: {org.upper()} PRs since {six_months_ago} ---")
        
        try:
            response = requests.get(url, headers=HEADERS)
            items = response.json().get('items', [])

            if not items:
                print(f"No PRs found for {org}.")
                continue

            for i, item in enumerate(items, 1):
                title = item.get('title')
                pr_node = item.get('pull_request', {})
                
                # Search API check
                merged_at_search = pr_node.get('merged_at', "MISSING_KEY")

                print(f"{i}. {title}")
                print(f"   - Search API 'merged_at': {merged_at_search}")
                
                # The "Truth" Call (Detail API)
                pr_detail_url = pr_node.get('url')
                if pr_detail_url:
                    detail_resp = requests.get(pr_detail_url, headers=HEADERS)
                    detail_data = detail_resp.json()
                    
                    # This is the key field we want for the main script
                    is_merged = detail_data.get('merged') 
                    actual_date = detail_data.get('merged_at')
                    
                    print(f"   - Detail API 'merged' status: {is_merged}")
                    print(f"   - Detail API 'merged_at': {actual_date}")
                
                print("-" * 30)

        except Exception as e:
            print(f"Error checking {org}: {e}")

if __name__ == "__main__":
    inspect_github_api()