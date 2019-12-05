FROM node:12.13.1

WORKDIR /app

COPY package.json /app/package.json
RUN cd /app
RUN npm install
COPY . /app

RUN npm run build

ENV PORT 3000

EXPOSE $PORT

CMD ["node", "serve"]