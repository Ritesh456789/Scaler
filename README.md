# Full Stack Amazon Clone

A fully functional e-commerce web application that replicates the core features and design of Amazon. Built with the MERN stack (utilizing mock data for simplicity without local DB setup) and styled with Tailwind CSS.

## 🚀 Live Demo
🔗 https://scaler-lx85.vercel.app/


## 🛠 Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Context API, React Router DOM, Axios
- **Backend:** Node.js, Express.js
- **Deployment:** Vercel (Frontend), Render (Backend)

## ✨ Key Features

### 1. Product Discovery & Search
- **Responsive Home Page:** Dynamic banner and product grid layout matching Amazon's clean aesthetics.
- **Advanced Search:** Filter products by **Title**, **Category**, or **Description**.
- **Category Filtering:** Dropdown menu in the search bar allows specific category searches (e.g., "Bags", "Electronics").

### 2. Product Details
- **Dynamic Routing:** Individual pages for each product (`/product/:id`).
- **Comprehensive Info:** high-quality images, descriptions, ratings (star component), and pricing.
- **Stock Status:** Visual indicators for stock and delivery estimates.

### 3. Shopping Cart
- **Persistent Storage:** Cart state is saved in `LocalStorage`, persisting across page refreshes.
- **Functionality:** Add items, remove items, adjust quantities, and view live subtotal calculations.
- **Notifications:** "Added to Cart" feedback on buttons.

### 4. Checkout Process
- **Address Form:** Validation ensures name, mobile, and address fields are filled.
- **Order placement:** Simulates order processing via API call.
- **Success Screen:** Displays Order ID and confirmation upon successful submission.

## 📂 Project Structure

```
amazon-clone/
├── backend/            # Express Server
│   ├── routes/         # API endpoints (products, orders)
│   └── server.js       # App entry point
│
├── frontend/           # React Client
│   ├── src/
│   │   ├── components/ # Reusable UI components (Header, ProductCard)
│   │   ├── context/    # Global State (CartContext)
│   │   ├── pages/      # Route Pages (Home, Cart, Checkout)
│   │   └── api.js      # API Configuration
│   └── vercel.json     # Deployment Config
```

## 🔧 Local Setup

### Prerequisites
- Node.js installed

### 1. Setup Backend
```bash
cd backend
npm install
npm start
```
*Server runs on port 5001.*

### 2. Setup Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on port 5173.*

## 🚀 Deployment Guide
**Backend (Render):**
1. Create a Web Service connected to the `backend` folder.
2. Build Command: `npm install`
3. Start Command: `node server.js`

**Frontend (Vercel):**
1. Import project pointing to `frontend` folder.
2. Add Environment Variable.
3. Deploy.

