# Role-Based Access Control System (RBAC) Backend

This project is a backend API built with **Node.js** and **Express**, implementing role-based access control (RBAC) to manage access to different resources based on user roles (Admin, Moderator, User). It also features user authentication using JWT tokens.

## Features

- **User Authentication**: 
  - Register new users (`/api/v1/signUp`).
  - Login and obtain a JWT token (`/api/v1/login`).
  - Logout users (`/api/v1/logout`).

- **Role-Based Authorization**: 
  - Access control to specific routes based on roles:
    - Admin-only routes.
    - Moderator and Admin routes.
    - General user access.

- **Protected Endpoints**:
  - `/admin`: Accessible only to Admins.
  - `/moderator`: Accessible to Moderators and Admins.
  - `/user`: Accessible to Admins, Moderators, and Users.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayush-singh-26/RBAC.git
   cd server
   npm install
2. Environment setUp
   ```bash
   PORT=8000
   JWT_SECRET=your_jwt_secret
3. Start the server
   ```bash
   npm run start

## If you want to test frontend
   ```bash
   cd client
   npm install
   npm run dev
you just need to signUp as role(admin/moderator/user) (just for demonstration)
and login with the credentials



