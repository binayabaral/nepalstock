FROM node:16

WORKDIR /source/api

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]
