FROM node:16.14-stretch-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig*.json ./

COPY . .

RUN npm i

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
