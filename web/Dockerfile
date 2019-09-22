FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000
# EXPOSE 8080

RUN npm run build
CMD ["npm", "run", "server"]
# CMD ["npm", "start", "--", "--host", "0.0.0.0"]