#!/bin/bash
 
if [[ $VERCEL_GIT_COMMIT_REF == "main"  ]] ; then 
  echo "This is prod branch"
  npm run build-prod
else 
  echo "This is stage branch"
  npm run build-stage
fi
