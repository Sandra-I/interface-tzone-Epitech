FROM node:12 AS build
VOLUME ["/app"]
WORKDIR /app
RUN pwd
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build
