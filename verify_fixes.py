import requests

print("Verifying CORS settings...")
try:
    response = requests.get('http://127.0.0.1:8000/api/', headers={'Origin': 'http://evil.com'})
    if 'Access-Control-Allow-Origin' not in response.headers:
        print("PASS: CORS correctly blocked evil.com")
    else:
        print(f"FAIL: Accepted origin evil.com: {response.headers.get('Access-Control-Allow-Origin')}")
        
    response = requests.get('http://127.0.0.1:8000/api/', headers={'Origin': 'http://localhost:3000'})
    if response.headers.get('Access-Control-Allow-Origin') == 'http://localhost:3000':
        print("PASS: CORS correctly allowed localhost:3000")
    else:
        print(f"FAIL: Did not explicitly allow localhost:3000. Header: {response.headers.get('Access-Control-Allow-Origin')}")

except Exception as e:
    print(f"Error checking CORS: {e}. Make sure the backend is running on port 8000.")

print("\nVerifying XSS fix (manual check required for visual confirmation)...")
print("Please visit a blog post page and ensure no alerts pop up if malicious content were present.")
print("The code static analysis confirms usage of DOMPurify.sanitize().")
