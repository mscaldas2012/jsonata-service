FROM node:10.14.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 10010
CMD [ "npm", "start"]