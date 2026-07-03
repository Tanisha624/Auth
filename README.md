# Basic Authentication System

A full-stack authentication project built using JavaScript, Node.js, Express.js, MongoDB, bcrypt, and JWT.  
This project includes user signup, login, logout, password hashing, and protected route access.

## Features
- User signup
- User login
- User logout
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- CORS support

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: bcrypt, JWT
- Tools: Postman, Git, GitHub, VS Code

## Project Overview
This project demonstrates how to build a secure authentication system for web applications.  
Users can create an account, log in securely, and access protected routes using a valid JWT token.  
Passwords are hashed before being stored in the database, improving overall security.

## Folder Structure
```bash
project-folder/
│── frontend/
│── backend/
│── models/
│── routes/
│── middleware/
│── config/
│── .env
│── package.json
│── README.md
```

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/basic-authentication-system.git
cd basic-authentication-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add environment variables
Create a `.env` file and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the project
```bash
npm start
```

## API Endpoints
### Signup
- `POST /signup`
- Registers a new user and hashes the password before saving.

### Login
- `POST /login`
- Verifies user credentials and returns a JWT token.

### Logout
- `POST /logout`
- Clears the user session/token.

### Protected Route
- `GET /protected`
- Accessible only with a valid JWT token.

## Future Scope
- Password reset functionality
- Email verification
- OTP verification
- Refresh tokens
- Role-based access control
- Account deletion

## Learning Outcome
This project improved understanding of secure authentication, API development, password hashing, JWT handling, and protected route implementation.

## Author
Built by **Tanisha Bansal**.
