#!/bin/bash
set -e

AWS_S3_REGION="us-east-2"
STAGING_BRANCH="develop"
PRODUCTION_BRANCH="production"

NODE_ENV=''
CLOUDFRONT_DIST_ID=''
if [[ $TRAVIS_BRANCH == $STAGING_BRANCH ]]; then
  NODE_ENV="staging"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_STAGING
  yarn add create-react-app
  yarn build
elif [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_PRODUCTION
  yarn add create-react-app
  yarn build
else
  echo "Not deploying"
  exit
fi

S3_BUCKET="boatyard-react-$NODE_ENV"
echo "Deploying to the $S3_BUCKET bucket"

pip install awscli --upgrade --user
aws s3 sync \
  build/ \
  "s3://$S3_BUCKET" \
  --acl public-read \
  --delete \
  --cache-control no-cache

aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths /*
