FROM node:latest

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app/

EXPOSE 5000

RUN yarn run tsc

ENTRYPOINT ["yarn","start"]