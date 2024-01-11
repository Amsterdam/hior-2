FROM node:16-bullseye AS builder
LABEL maintainer="datapunt@amsterdam.nl"

WORKDIR /app

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

COPY package.json \
  package-lock.json \
  .eslintrc.js \
  .gitignore \
  .prettierrc \
  tsconfig.json \
  /app/

# Install NPM dependencies.
RUN npm --production=false --unsafe-perm ci && \
  npm cache clean --force

COPY public /app/public
COPY src /app/src

RUN chown -R node:node /app
USER node

# Upgrade dependencies
FROM builder AS upgrade
# install dependencies
RUN npm ci
RUN npm install -g npm-check-updates
CMD ["ncu", "-u", "--doctor", "--target minor"]

# Test
FROM builder as test
RUN echo "run test"
RUN npm run test

# Build
FROM builder as build

RUN chown -R node:node /app
USER node

RUN echo "run build"
RUN GENERATE_SOURCEMAP=false npm run build

# Deploy
FROM nginx:stable-alpine-slim
COPY --from=build /app/build/. /var/www/html/

COPY default.conf /etc/nginx/conf.d/

WORKDIR /app
COPY ./env.sh env.sh
# Add bash
RUN apk add --no-cache bash

# Make shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/app/env.sh && nginx -g \"daemon off;\""]