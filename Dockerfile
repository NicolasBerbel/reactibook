FROM node:12.13.1

WORKDIR /frontend
COPY frontend/package.json /frontend/package.json
RUN cd /frontend
RUN npm install
COPY frontend/. /frontend
RUN npm run build

WORKDIR /backend
COPY backend/package.json /backend/package.json
RUN cd /backend
RUN npm install
COPY backend/. /backend
RUN npm run build
COPY environments/. /environments

ARG PORT=80
ENV PORT=$PORT
EXPOSE $PORT

CMD ["npm", "start"]