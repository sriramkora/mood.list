FROM node:18-buster

WORKDIR /src
COPY . /src

RUN npm i
RUN npm i -g pino-pretty

EXPOSE 8080

CMD node app.js | pino-pretty