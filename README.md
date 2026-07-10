# CloudNotes MERN

A full-stack cloud-based note management application built with the MERN stack. CloudNotes allows users to securely register, authenticate, and manage their personal notes through a responsive user interface and protected REST APIs.

## Author

*Samman Shaehzadi*

## Project Overview

CloudNotes is designed to help users organize and manage notes efficiently. The application provides a secure authentication system, user-specific note management, and a modern responsive interface.

The backend is built with Node.js, Express.js, and MongoDB,and react, implementing JWT authentication, password hashing with bcrypt, custom middleware, and request validation using Express Validator.

The frontend is developed with React and integrates React Router, React Hook Form, Axios, Context API, and SweetAlert2 to provide a smooth and user-friendly experience.

## Features

* User Registration
* User Login Authentication
* JWT-Based Authorization
* Password Hashing with bcrypt
* Protected Routes
* Create Notes
* View Notes
* Update Notes
* Delete Notes
* User-Specific Notes Access
* MongoDB Database Integration
* RESTful API Architecture
* React Context API State Management
* Form Validation with React Hook Form
* SweetAlert2 Notifications
* Fully Responsive Design

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hook Form
* React Icons
* SweetAlert2
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Express Validator
* dotenv
* CORS

## Authentication Routes

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | /api/auth/createuser | Register a new user                |
| POST   | /api/auth/login      | Authenticate user and generate JWT |
| POST   | /api/auth/getuser    | Get logged-in user details         |

## Notes Routes

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| GET    | /api/notes/fetchallnotes  | Fetch all notes         |
| POST   | /api/notes/addnote        | Create a new note       |
| PUT    | /api/notes/updatenote/:id | Update an existing note |
| DELETE | /api/notes/deletenote/:id | Delete a note           |

## Installation

### Clone Repository

```bash
git clone https://github.com/CodeBySamman/cloudnotes-fullstack-mern.git
```

### Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5011
```

## Run Project

This project is configured to run both frontend and backend simultaneously using a single command.

```bash
npm run both
```

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:5011
```

## Security Features

* JWT Authentication
* Password Hashing
* Protected API Routes
* User-Specific Data Access
* Request Validation
* Secure Authentication Middleware

## Future Improvements

* Search Notes
* Categories & Tags Filtering
* Dark Mode
* Archive Notes
* Note Sharing
* Rich Text Editor


