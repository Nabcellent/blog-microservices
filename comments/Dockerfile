FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN yarn start
COPY ./ ./

CMD ["yarn", "start"]