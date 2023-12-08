import json
import os

def lambda_handler(event, context):
    dbKey = os.getenv('DB_KEY')
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda! DB_KEY = ' + dbKey)
    }

