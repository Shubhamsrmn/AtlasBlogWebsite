# Cab Booking Backend

This is the server-side implementation of a cab booking application built with Node.js, Express, and MongoDB. The backend handles user authentication, registration, and profile retrieval.

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v14 or later)
- MongoDB (running locally or in the cloud)
- A `.env` file configured with:
  - `PORT`: The port number to run the server
  - `MONGODBURL`: MongoDB connection string
  - `JWTSECRETKEY`: Secret key for JWT

## How to Run

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install

    Set up your .env file with the required variables.
    Start the server:

    npm start
   ```

API Endpoints
Base URL

All endpoints are prefixed with the base URL:

http://<your-server-domain>/users

1. User Registration

Endpoint: POST /register
Description: Registers a new user.
Request

    Headers: None
    Body (JSON):

    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }

Response

    Success (201 Created):

{
"success": true,
"message": "User registered successfully",
"data": {
"user": {
"\_id": "648c14fef8f91232d1234567",
"fullName": {
"firstName": "John",
"lastName": "Doe"
},
"email": "johndoe@example.com",
"createdAt": "2024-12-05T10:00:00Z"
},
"token": "eyJhbGciOiJIUzI1..."
}
}

Error (400 Bad Request):

    {
      "success": false,
      "message": "Validation Error",
      "errors": [
        { "msg": "Invalid email", "param": "email", "location": "body" }
      ]
    }

2. User Login

Endpoint: POST /login
Description: Logs in an existing user.
Request

    Headers: None
    Body (JSON):

    {
      "email": "johndoe@example.com",
      "password": "password123"
    }

Response

    Success (200 OK):

{
"success": true,
"message": "Login successful",
"data": {
"token": "eyJhbGciOiJIUzI1..."
}
}

Error (401 Unauthorized):

    {
      "success": false,
      "message": "Invalid email or password"
    }

3. Get User Profile

Endpoint: GET /profile
Description: Retrieves the profile of the authenticated user.
Request

    Headers:

    {
      "Authorization": "Bearer <your-token>"
    }

    Body: None

Response

    Success (200 OK):

{
"success": true,
"message": "Profile fetched successfully",
"data": {
"user": {
"\_id": "648c14fef8f91232d1234567",
"fullName": {
"firstName": "John",
"lastName": "Doe"
},
"email": "johndoe@example.com"
}
}
}

Error (401 Unauthorized):

    {
      "success": false,
      "message": "Unauthorized: No token provided"
    }

Error Handling

All errors return a consistent JSON structure:

{
"success": false,
"message": "Error message",
"data": {
"error": "Detailed error information (if applicable)"
}
}

Common Error Status Codes

    400 Bad Request: Validation errors or missing fields.
    401 Unauthorized: Missing or invalid authentication token.
    500 Internal Server Error: Unexpected server errors.

Models
User Model

{
fullName: {
firstName: { type: String, required: true, minLength: 3 },
lastName: { type: String, required: true, minLength: 3 }
},
email: { type: String, required: true, unique: true, minLength: 5 },
password: { type: String, required: true, select: false },
socketId: { type: String }
}

Future Enhancements

    Add cab booking features.
    Implement role-based access control (e.g., admin, driver, passenger).
    Add ride history and payment functionality.
    Enable real-time updates using WebSockets for live booking status.

License

This project is licensed under the MIT License. Feel free to use and modify it.

---

This README is structured and professional, covering all necessary API details and providing guida
