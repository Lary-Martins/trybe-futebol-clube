FROM node:16-alpine

WORKDIR /app

COPY packge*.json /

RUN npm install

COPY . . 

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
