🎬 MERN Stack Movie Collection Application
📌 Project Overview

This is a full-stack MERN Movie Collection application with JWT-based authentication and role-based access control.
Users can browse, search, and sort movies, while administrators can add, edit, and delete movie records.

The application is inspired by IMDb Top 250 Movies and is built with scalability and performance in mind.

🚀 Live Application

Frontend (vercel): [https://your-frontend-url.netlify.app](https://mern-movie-collection-frontend.vercel.app/)

Backend (vercel):[ https://your-backend-url.com](https://mern-movie-collection-backend.vercel.app/)

🛠 Tech Stack
Frontend

React.js

Material-UI (MUI)

Redux / Context API

React Router DOM

Axios

Backend

Node.js

Express.js

MongoDB (MongoDB Atlas / Local)

JWT Authentication

🔐 Authentication & Authorization

JWT-based authentication

Role-based access control (Admin & User)

Admin-only protected routes

Default role for all users is USER

Admin Credentials
Email: admin@gmail.com
Password: admin

👤 User Features

View all movies with pagination

Search movies by name or description

Sort movies by:

Name

Rating

Release Date

Duration


End point 

| Method | Endpoint                   | Description                               | Auth | Role  |
| ------ | -------------------------- | ----------------------------------------- | ---- | ----- |
| GET    | `/api/users/import-movies` | Import movies into database               | ✅    | Admin |
| GET    | `/api/users/movies`        | Get all movies (search, sort, pagination) | ✅    | User  |
| POST   | `/api/users/create-movie`  | Create a new movie                        | ✅    | Admin |
| PUT    | `/api/users/update/:id`    | Update movie by ID                        | ✅    | Admin |
| DELETE | `/api/users/delete/:id`    | Delete movie by ID                        | ✅    | Admin |


🛡 Admin Features

Add new movie

Edit movie details

Delete movies

Access secured admin routes




Install dependencies:

npm install


Create a .env file with the following variables:
DATABASE_URL=mongodb+srv://prateekrajbhar3311_db_user:beenu1234@cluster0.zhzq6ik.mongodb.net/test
SECRET_KEY=mahadev
PORT=3000


Start the backend server:

npm start
