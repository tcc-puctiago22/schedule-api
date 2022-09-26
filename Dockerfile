FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 9000

CMD nodemon -L --watch . app/server
