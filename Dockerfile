FROM node:20.10.0 as builder

WORKDIR /source

COPY package.json /source

COPY package-lock.json /source

RUN npm ci

COPY . /source/

EXPOSE 5000

CMD [ "npm","run" ,"start"]