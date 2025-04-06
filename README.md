Employee Management System

## Overview

This full-stack application consists of an Angular frontend and a Node.js backend using GraphQL for data fetching. The frontend is deployed on Vercel and the backend on Railway.

### Key Features:
- **User Authentication:** Login, signup, and session management.
- **Employee Management:** CRUD operations for employee data (Add, View, Edit, Delete).
- **Search & File Upload:** Search employees by department/position and upload profile pictures.
- **Responsive UI:** Built with Material-UI or Bootstrap for a clean, mobile-friendly design.
- **Logout:** Clears session and redirects to the login page.

---

## Deployment

- **[Frontend (Angular)](https://101445260-comp3133-assignment2-eyqp.vercel.app/login):** Live Demo
- **[Backend (Node.js/GraphQL)](https://101445260comp3133assignment2-production.up.railway.app/graphql):** API Endpoint

---

## Running Locally

### Backend:
1. Navigate to `backend/`.
2. Install dependencies: `npm install`.
3. Start the server: `npm start`.

### Frontend:
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Set the API URL in `src/environments/environment.ts`:

   ```ts
   apiUrl: 'https://101445260comp3133assignment2-production.up.railway.app/'
