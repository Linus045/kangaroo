FROM node:18-alpine as builder

WORKDIR /app
COPY kangaroo/package*.json ./
RUN npm install
COPY ./kangaroo .
RUN npm run build


FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev
EXPOSE 3000

CMD ["npm", "start"]
