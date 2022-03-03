FROM node:16

RUN apt-get update && apt-get install gnupg2 -y

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./
COPY . .

RUN yarn

USER node