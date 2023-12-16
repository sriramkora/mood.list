import requests
import boto3
import os
import json

API_KEY = os.environ['API_KEY']
API_SECRET = os.environ['API_SECRET']
OPENAI_KEY = os.environ['OPENAI_KEY']
def lambda_handler(event, context):
    api_endpoint = 'https://api.openai.com/v1/chat/completions'
    print('event: ', event['body'])
    text = json.loads(event['body'])['message']
    comprehend = boto3.client('comprehend', region_name='us-east-1', aws_access_key_id=API_KEY, aws_secret_access_key=API_SECRET)

    key_phrases_response = comprehend.detect_key_phrases(Text=text, LanguageCode='en')
    
    filtered_key = [phrase['Text'] for phrase in key_phrases_response['KeyPhrases'] if phrase['Score'] >= 0.99]
    
    key_phrases = ' '.join(filtered_key)
    query="Key Phrases: "+key_phrases+"Use these keywords to give me a playlist name I can use to search playlists related to these keywords. Limit your response to just one playlist name and nothing else."
    print(query)
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            "role": "user",
            "content": query
          }
        ]
      }

    authorization_token = 'Bearer ' + OPENAI_KEY

    headers = {
        'Content-Type': 'application/json',
        'Authorization': authorization_token
    }

    try:
        # Make a POST request to the API endpoint with headers
        response = requests.post(api_endpoint, json=payload, headers=headers)

        # Check the response status code
        if response.status_code == 200:
            print("POST request successful!")
            print("Response:", response.json())
            rj=response.json()
            print(rj['choices'][0]['message']['content'])
            return {
                'statusCode': 200,
                'headers': {
                     'Access-Control-Allow-Origin': '*',
                     'Access-Control-Allow-Headers': 'Content-Type',
                     'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'},
                 'body': json.dumps({
                     'message': rj['choices'][0]['message']['content']
                 })
                 
             }
        else:
            print(f"POST request failed with status code {response.status_code}")
            print("Response:", response.text)

    except Exception as e:
        print(f"Error making POST request: {e}")
        
    
