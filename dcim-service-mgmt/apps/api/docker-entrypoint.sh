#!/bin/sh
set -e

echo "Running Prisma migrations..."
npx prisma migrate deploy || true

echo "Attempting seed (idempotent upserts)..."
node -e "console.log('Seeding via ts-node...')" >/dev/null 2>&1 || true
npx ts-node prisma/seed.ts || true

echo "Starting API..."
node dist/main.js
