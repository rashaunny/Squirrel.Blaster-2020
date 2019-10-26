#!/usr/bin/env python3

import boto3
import sys

AWS_REGION='us-west-2'
AWS_ACCESS_KEY_ID='AKIAI4NRAP7HGREY533Q'
AWS_SECRET_ACCESS_KEY='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'

REKOGNITION_CLIENT = boto3.client(
    'rekognition',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)

def find_squirrel_confidence(image_file):
    # Convert image to bytearray
    with open(image_file, 'rb') as image:
        bytes = bytearray(image.read())
    # Make API call to get labels
    response = REKOGNITION_CLIENT.detect_labels(
        Image={ 'Bytes': bytes },
        MinConfidence=20,
    )
    # Process each label
    for label in response['Labels']:
        print('({:.2f}%) {}'.format(label['Confidence'], label['Name']))
        if label['Name'] == 'Squirrel':
            return label['Confidence']
    return 0

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('usage: main.py image_file ...')
        exit()
    
    image_files = sys.argv[1:]

    for image_file in image_files:
        confidence = find_squirrel_confidence(image_file)
        print(image_file)
        if confidence > 0:
            print('It\'s a squirrel ({:.2f}%)!'.format(confidence))
        else:
            print('Nope')
        print()
