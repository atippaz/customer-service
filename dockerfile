FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json .
COPY src .
COPY prisma .
COPY nginx.conf .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN npm install

CMD ["npm", "start"]
EXPOSE 5000

