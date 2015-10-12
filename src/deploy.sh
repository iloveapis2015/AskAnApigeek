#!/bin/sh
source ../setup/setenv.sh

if [[ -z "$1" ]]; then
  echo "Enter your username for the Apigee Enterprise, followed by [ENTER]: >"
  read username
else
  username=$1
fi
echo "Enter your password for the Apigee Enterprise, followed by [ENTER]:"
  read -s password

echo Deploying the api proxy to the org $org on $environment using $username

mvn install -P$environment -Dusername=$username -Dpassword=$password -Dorg=$org -Dapigee.options=validate,override

