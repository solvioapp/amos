FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000
# EXPOSE 8080

# Add bash
# RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
# CMD ["/bin/bash", "-c", "/app/env.sh &&  -g \"daemon off;\""]

# RUN /app/env.sh && npm run build
# CMD ["npm", "run", "server"]
# CMD ["/app/env.sh", "npm run build && npm run server"]
# CMD ["npm", "start", "--", "--host", "0.0.0.0"]
# CMD /app/env.sh && npm run build && npm run server
RUN npm run build
CMD npm run start:production
