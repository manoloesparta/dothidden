FROM node:16.14-stretch-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npx tsc

CMD ["npm", "run", "start"]
