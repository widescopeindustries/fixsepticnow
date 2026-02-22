#!/usr/bin/env python3
"""Quick GSC report for fixsepticnow.com"""
import os
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
SERVICE_ACCOUNT_FILE = os.path.join(PROJECT_DIR, 'gsc-service-account.json')
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

def main():
    print("=" * 60)
    print("  GOOGLE SEARCH CONSOLE REPORT - fixsepticnow.com")
    print(f"  Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 60)
    
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('searchconsole', 'v1', credentials=creds)
    
    # List sites
    print("\n=== ACCESSIBLE SITES ===")
    response = service.sites().list().execute()
    sites = []
    if 'siteEntry' in response:
        for site in response['siteEntry']:
            print(f"  - {site['siteUrl']} ({site['permissionLevel']})")
            sites.append(site['siteUrl'])
    
    # Find our site
    site_url = None
    for s in sites:
        if 'fixsepticnow' in s:
            site_url = s
            break
    
    if not site_url:
        print("\nERROR: fixsepticnow not found in GSC")
        return
    
    print(f"\nUsing: {site_url}")
    
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=28)).strftime('%Y-%m-%d')
    
    # Daily trend
    print(f"\n=== DAILY TREND (Last 14 days) ===\n")
    rows = service.searchanalytics().query(siteUrl=site_url, body={
        'startDate': (datetime.now() - timedelta(days=14)).strftime('%Y-%m-%d'),
        'endDate': end_date,
        'dimensions': ['date'],
        'rowLimit': 14
    }).execute().get('rows', [])
    
    print(f"{'Date':<12} {'Clicks':>8} {'Impr':>10} {'CTR':>8} {'Pos':>8}")
    print("-" * 50)
    for row in sorted(rows, key=lambda x: x['keys'][0]):
        print(f"{row['keys'][0]:<12} {row['clicks']:>8} {row['impressions']:>10} {row['ctr']*100:>7.1f}% {row['position']:>7.1f}")
    
    # Top queries
    print(f"\n=== TOP QUERIES (Last 28 days) ===\n")
    rows = service.searchanalytics().query(siteUrl=site_url, body={
        'startDate': start_date,
        'endDate': end_date,
        'dimensions': ['query'],
        'rowLimit': 20
    }).execute().get('rows', [])
    
    print(f"{'Query':<45} {'Clicks':>8} {'Impr':>8} {'Pos':>8}")
    print("-" * 73)
    for row in sorted(rows, key=lambda x: x['clicks'], reverse=True)[:20]:
        q = row['keys'][0][:43]
        print(f"{q:<45} {row['clicks']:>8} {row['impressions']:>8} {row['position']:>7.1f}")
    
    # Top pages
    print(f"\n=== TOP PAGES (Last 28 days) ===\n")
    rows = service.searchanalytics().query(siteUrl=site_url, body={
        'startDate': start_date,
        'endDate': end_date,
        'dimensions': ['page'],
        'rowLimit': 15
    }).execute().get('rows', [])
    
    print(f"{'Page':<55} {'Clicks':>8} {'Impr':>8}")
    print("-" * 75)
    for row in sorted(rows, key=lambda x: x['clicks'], reverse=True)[:15]:
        p = row['keys'][0].replace('https://fixsepticnow.com', '')[:53] or '/'
        print(f"{p:<55} {row['clicks']:>8} {row['impressions']:>8}")
    
    print("\n" + "=" * 60)

if __name__ == '__main__':
    main()
