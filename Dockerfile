FROM node:latest
COPY ./dist /home/node/app
WORKDIR /home/node/app
RUN node main.js
EXPOSE 3000