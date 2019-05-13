#!/bin/bash
set -ex

# deploy run only on prod and stagin
if [ $TRAVIS_BRANCH != "$PRODUCTION_BRANCH" ] && [ $TRAVIS_BRANCH != "$STAGING_BRANCH" ]; then
  exit 0
fi;

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

curl -X GET -H 'Token: $WEBHOOK_TOKEN' http://secret-$NODE_ENV.boatyard.com/hooks/travis
