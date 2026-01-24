# Prisma ORM with Express

A CRUD API built with Express.js and Prisma ORM demonstrating database relationships with Users, Posts.

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

### Users
- `GET /api/users/` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/` - Create a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
- `PUT /api/users/:id` - Update user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
- `DELETE /api/users/:id` - Delete user

### Posts
- `GET /api/posts/` - Get all posts
- `GET /api/posts/:id` - Get post by ID (with comments and user)
- `POST /api/posts/` - Create a new post
  - Body: `{ "userId": number, "tittle": "string", "Description": "string" }`
- `PUT /api/posts/:id` - Update post
  - Body: `{ "tittle": "string", "Description": "string" }`
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/comments/` - Get all comments
- `GET /api/comments/:id` - Get comment by UUID
- `POST /api/comments/` - Create a new comment
  - Body: `{ "userId": number, "postId": number, "comment": "string" }`
- `PUT /api/comments/:id` - Update comment
  - Body: `{ "userId": number, "postId": number, "comment": "string" }`
- `DELETE /api/comments/:id` - Delete comment

## Prisma Commands

```bash
# Run migrations
npx prisma migrate dev --name <migration_name>

# Open Prisma Studio (DB viewer)
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Pull the schema from an existing database, updating the Prisma schema
npx prisma db pull

# Push the Prisma schema state to the database
npx prisma db push

# Validate your Prisma schema
npx prisma validate

# Format your Prisma schema
npx prisma format

# Display Prisma version info
npx prisma version

# Display Prisma debug info
npx prisma debug
```

## Notes

- Use `String?` in schema for optional/nullable fields
- Use `deleteMany` for bulk deletions

the second branch is working of relation in prisma

**uuid kab use kre** -> security purpose it us not easily gussing , encrypted string ,
multiple database use krti hu sbki row ki id uniqueness ke liye

**id** -> performance based and sorting ,searching .

npx prisma migrate dev --name = schema
for e.g. schema any table name

Set up a new local Prisma Postgres `prisma dev`-ready project
```bash
$ prisma init
```

Start a local Prisma Postgres server for development
```bash
$ prisma dev
```

Generate artifacts (e.g. Prisma Client)
```bash
$ prisma generate
```

Browse your data
```bash
$ prisma studio
```

Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
```bash
$ prisma migrate dev
```
