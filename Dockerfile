FROM node:12.14-alpine as react

RUN set -xe \
  && apk add --no-cache bash git openssh

WORKDIR /client

COPY /client/package.json .
COPY /client/yarn.lock .
COPY /client/.flowconfig .

ENV CYPRESS_INSTALL_BINARY=0

RUN yarn install

COPY /client/public ./public
COPY /client/src ./src

RUN yarn build

FROM node:12.14-alpine

RUN apk add --update build-base python python-dev

COPY /package.json .
COPY /yarn.lock .

RUN yarn install --production

COPY mm-config.js .

COPY --from=react /client/build /server/static
COPY /server /server
COPY /scripts /scripts

ENTRYPOINT [ "yarn" ]
CMD [ "start:server" ]
