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

the second branch is working of relation in prisma
uuid kab use kre -> security purpose it us not easily gussing , encrypted string ,
multiple database use krti hu sbki row ki id uniqueness ke liye
id -> performance based and sorting ,searching .

npx prisma migrate dev --name = schema
for e.g. schema any table name
Set up a new local Prisma Postgres `prisma dev`-ready project
$ prisma init

      Start a local Prisma Postgres server for development
      $ prisma dev

      Generate artifacts (e.g. Prisma Client)
      $ prisma generate

      Browse your data
      $ prisma studio

      Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
      $ prisma migrate dev

      Pull the schema from an existing database, updating the Prisma schema
      $ prisma db pull

      Push the Prisma schema state to the database
      $ prisma db push

      Validate your Prisma schema
      $ prisma validate

      Format your Prisma schema
      $ prisma format

      Display Prisma version info
      $ prisma version

      Display Prisma debug info
      $ prisma debug
