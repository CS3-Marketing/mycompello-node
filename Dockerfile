FROM node:16

WORKDIR /usr/src/app

ENV NODE_ENV development

COPY package.json ./

COPY . .

RUN yarn && yarn run build

CMD [ "yarn", "start" ]