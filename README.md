# Prisma ORM with Express

A CRUD API built with Express.js and Prisma ORM.

## Setup

```bash
npm install
npx prisma init
npx prisma migrate dev --name create_user_schema
```

## Running the Server

```bash
npm start
```

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Prisma Commands

```bash
# Run migrations
npx prisma migrate dev --name <migration_name>

# Open Prisma Studio (DB viewer)
npx prisma studio
```

## Notes

- Use `String?` in schema for optional/nullable fields
- Use `deleteMany` for bulk deletions 