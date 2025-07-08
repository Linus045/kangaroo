FROM node:18-alpine

WORKDIR /app

COPY kangaroo/package*.json ./

RUN npm install --omit=dev

COPY ./kangaroo .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
