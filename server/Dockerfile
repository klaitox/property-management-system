FROM node:16-alpine

RUN npm install -g nodemon

WORKDIR /server

COPY package.json .

RUN npm install 


COPY . .

EXPOSE 3001

CMD ["npm","start"]