#!/bin/bash

# Based on this article: https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/

# Recreate config file
rm -rf /tmp/env-config.js
touch /tmp/env-config.js

# Add assignment 
echo "window._env_ = { REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING: \"${REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING}\" }" >> /tmp/env-config.js