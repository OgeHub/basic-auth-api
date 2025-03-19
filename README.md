# Basic Auth API

This project is a basic email Auth API built with Node.js, Express, and Mongoose. The API provides endpoints for register, login, and get profile. It includes JWT set up, authenticate middleware, custom logger and Dependency injection config.

## Project Setup

1. **Clone the repository**:

```sh
   git clone https://github.com/OgeHub/basic-auth-api.git
   cd basic-auth-api
```

2. **Install dependencies**:

```sh
    npm install
```

3. **Environment variables**:
   Create a .env file in the root of your project and add the following variables:

```sh
   PORT=
   MONGODB_URI=
   JWT_EXPIRE_AT=
   JWT_SECRET=
```

## Running the Application

1. Start the MongoDB server
   Make sure you have a MongoDB server running on your local machine if you are running locally and provide the appropriate MongoDB URI in the .env file.

2. Start the Application in Development mode

```sh
npm run dev
```

3. Build and Run Application

```sh
npm run build
npm start
```

## Endpoints

`Base_URL` = `http://localhost:3030`

**Register**:

```http
POST /api/auth/register
Host: Base_URL
Content-type: application/json
```

- Request body:

```json
{
  "first_name": "Joy",
  "last_name": "Joy",
  "username": "jhjds",
  "email": "kshsj@hss.cn",
  "password": "Aw&erws9fs"
}
```

- Response:

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGFjZjkyZjBhYjNmZjhODU1MTI4OCIsImlhdCI6MTc0MjM5MzIzNSwiZXhwIjoxNzQyNDc5NjM1fQ.0f1J7hhLwDjSZSEN8OiaLDcTLr7U7ZrQCek_wr5BzI"
  }
}
```

**Login**:

```http
POST /api/auth/login
Host: Base_URL
Content-Type: application/json
```

- Request body:

```json
{
  "email": "kshsj@hss.cn",
  "password": "Aw&erws9fs"
}
```

- Response:

```json
{
  "status": "success",
  "message": "User login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGFjZjkyZjBhYNmZjhlODU1MTI4OCIsImlhdCI6MTc0MjM5Mzg5MywiZXhwIjoxNzQyNDgwMjkzfQ.jek0VKogxuqCQbC9jGnC3A2FbQW_pD4u5JggoTZ7cQ"
  }
}
```

**Profile**:

```http
GET /api/users/profile
Host: Base_URL
Content-Type: application/json
Authorization: Bearer access_token(from response of register or login)
```

- Response:

```json
{
  "status": "success",
  "message": "User details retrieved successfully",
  "data": {
    "_id": "67dacf92f0ak3ff8e8551288",
    "first_name": "Joy",
    "last_name": "Joy",
    "email": "kshsj@hss.cn",
    "username": "jhjds",
    "createdAt": "2025-03-19T14:07:14.697Z",
    "updatedAt": "2025-03-19T14:07:14.697Z"
  }
}
```
