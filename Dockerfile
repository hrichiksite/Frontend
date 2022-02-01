FROM node:12.18.0

WORKDIR /usr/src/app

COPY . .

RUN apt-get update

RUN node --version && npm version

RUN npm install 

RUN npm run build

CMD [ "npm", "run", "server" ]
