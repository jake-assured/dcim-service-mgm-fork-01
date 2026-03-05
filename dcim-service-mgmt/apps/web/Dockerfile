FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm install

COPY . .

WORKDIR /app/apps/web
EXPOSE 5173
CMD ["npm", "run", "dev"]
