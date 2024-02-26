FROM node:16-alpine
RUN apk add tzdata
RUN apk add make gcc g++ python3
ENV TZ Europe/Moscow
ENV NODE_PATH /opt/server/node_modules
WORKDIR /opt/server/
COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm" ,"run start"]