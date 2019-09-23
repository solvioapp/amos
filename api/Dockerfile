FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install --quiet
COPY . .

ENV GRAPHQL_PORT=80
ENV NEO4J_URI=bolt://hobby-gjdkpaphfkpjgbkehgobnodl.dbs.graphenedb.com:24787
ENV NEO4J_USERNAME=neo4j
ENV NEO4J_PASSWORD=letmein

EXPOSE 80 4000 4001

RUN npm run build
CMD ["npm", "run", "start"]