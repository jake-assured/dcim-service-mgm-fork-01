FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm install

COPY . .

WORKDIR /app/apps/api
RUN npm run prisma:generate
RUN npm run build

EXPOSE 3001
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
