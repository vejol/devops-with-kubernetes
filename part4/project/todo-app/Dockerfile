FROM node:22.3.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY . .

CMD ["node", "index.js"]