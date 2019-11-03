FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY web/package.json .
RUN npm install --quiet
COPY web .

WORKDIR /common
COPY common .

EXPOSE 8080

# RUN npm run build
# CMD npm run start:prod
WORKDIR /app
CMD npm run start
