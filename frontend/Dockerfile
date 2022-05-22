FROM node:14

WORKDIR /source/webapp

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
