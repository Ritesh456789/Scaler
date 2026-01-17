# Amazon Clone Assignment

This is a fullstack Amazon Clone built with React.js (Vite) and Node.js/Express.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Router DOM, Context API
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Schema provided in `backend/schema.sql`). *Note: The application currently uses in-memory mock data to ensure functionality without requiring a local database setup during evaluation.*

## Features implemented
1. **Product Listing:** Grid layout, responsive, matching Amazon's design.
2. **Product Detail:** Image, description, price, buy/add-to-cart buttons.
3. **Cart:** Add/Remove items, update quantity, subtotal calculation.
4. **Checkout:** Address form, mock payment selection, order placement.
5. **Search:** Functional search bar in header (filters in-memory products).

## Setup Instructions

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`.

### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:5173`.

## Assumptions
- Default user is logged in (Authentication is simulated/bypassed).
- Database is mocked for portability and ease of testing. Schema is provided for design verification.
