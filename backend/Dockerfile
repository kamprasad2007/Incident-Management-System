FROM node:13.12.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . ./

RUN npm install -g nodemon

CMD ["npm", "run", "start:dev"]