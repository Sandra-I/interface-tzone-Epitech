FROM node:12 AS build
VOLUME ["/app"]
WORKDIR /app
RUN pwd
COPY package.json package-lock.json ./
RUN npm install
RUN echo "LS DIRECTORY 1" && ls

COPY . .
RUN echo "LS DIRECTORY 2" && ls
RUN npm run build
RUN echo "LS /app DIRECTORY" && cd /app/dist/ && ls
