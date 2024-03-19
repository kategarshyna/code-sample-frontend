FROM node:19-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

# Create a script to run both npm ci and npm start
COPY .docker/bin/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

CMD ["/usr/local/bin/start.sh"]

EXPOSE 3000