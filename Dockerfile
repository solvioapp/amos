# Setup and build web

FROM node:latest as web

WORKDIR /app/web/
COPY web/package*.json ./
RUN npm install -qy
COPY web/ ./
RUN npm run build


# Setup the webserver

FROM node:latest

WORKDIR /app/
COPY --from=web /app/web/public/ ./web/public/

WORKDIR /app/webserver/
COPY api/package*.json ./
RUN npm install -qy
COPY api/ ./

ENV PORT 4001

EXPOSE 4001

CMD ["npm", "start"]