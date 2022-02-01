FROM node:lts

WORKDIR /app/deploy

COPY . .

RUN apt-get update

RUN node --version && npm version

RUN npm install 

RUN npm run build

CMD [ "npm", "run", "server" ]
