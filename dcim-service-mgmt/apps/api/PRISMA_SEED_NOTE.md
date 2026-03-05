To run seed locally (inside the api container it runs automatically during build in this MVP), you can execute:

```bash
docker compose exec api sh -lc "npx prisma migrate dev --name init && npx prisma db seed"
```

If you prefer Prisma's standard seed configuration, add this to `apps/api/package.json`:
```json
"prisma": { "seed": "ts-node prisma/seed.ts" }
```
