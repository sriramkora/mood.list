import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    print('event: ',event)
    body = json.loads(event['Records'][0]['body']) 
    print('email', body['email'])
    print('playlist', body['message'])
    sender_email = "sk9944@nyu.edu"
    recipient_email = body['email']
    subject = "Playlist was added to your mood.lists"
    body_text = "Hello, \nThe following playlist was added to your account:\n"+body['message']
    print('body_text: '+body_text)
    aws_region = "us-east-1"
    charset = "UTF-8"
    
    ses_client = boto3.client('ses', region_name=aws_region)
    
    try:
        response = ses_client.send_email(
            Destination={
                'ToAddresses': [recipient_email],
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': charset,
                        'Data': body_text,
                    },
                },
                'Subject': {
                    'Charset': charset,
                    'Data': subject,
                },
            },
            Source=sender_email,
        )

        print("Email sent! Message ID:", response['MessageId'])
        return {
            'statusCode': 200,
            'body': json.dumps('Email sent successfully!')
        }
    except ClientError as e:
        print("Error sending email:", e.response['Error']['Message'])
        return {
            'statusCode': 500,
            'body': json.dumps('Error sending email.')
        }
