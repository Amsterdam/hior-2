FROM node:16-bullseye AS builder
LABEL maintainer="datapunt@amsterdam.nl"

WORKDIR /app

COPY . /app

COPY package.json \
  package-lock.json \
  .eslintrc.js \
  .gitignore \
  /app/

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

# Install NPM dependencies.
RUN npm --production=false --unsafe-perm ci && \
  npm cache clean --force

# Test 
FROM builder as test
RUN echo "run test"
RUN npm run test

# Build
FROM builder as build
RUN echo "run build"
RUN GENERATE_SOURCEMAP=false npm run build

# Deploy
# FROM nginxinc/nginx-unprivileged:mainline-alpine-slim
FROM nginx:1.25.3-alpine
COPY --from=build /app/build/. /var/www/html/

COPY default.conf /etc/nginx/conf.d/

WORKDIR /tmp/
COPY ./env.sh .
# Add bash
RUN apk add --no-cache bash

# Make shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/tmp/env.sh && nginx -g \"daemon off;\""]