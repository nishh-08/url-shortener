# LinkSnap

LinkSnap is a full-stack URL shortener with an integrated analytics dashboard that allows users to create, share, and track shortened links in real time.

---

## Overview

LinkSnap enables users to convert long URLs into short, manageable links while providing insights into link performance through a built-in analytics system.

---

## Live Demo

- Frontend: https://linksnap-nu.vercel.app

---

## Features

### 🔗 URL Shortening
- Convert long URLs into short links  
- Support for custom short codes  
- Fast redirection to original URLs  

---

### 📊 Analytics Dashboard
- Total click count per link  
- Click history tracking  
- Date-wise visualization using charts  

---

### 📱 User Experience
- QR code generation for each link  
- Copy-to-clipboard with feedback  
- Smooth animations and transitions  
- Loading indicators for better UX  

---

## How It Works

1. User submits a long URL (with optional custom code)  
2. Backend validates input and generates a unique short code  
3. URL data is stored in PostgreSQL (Supabase)  
4. When a short link is accessed:
   - User is redirected to the original URL  
   - Click event is recorded in the database  
5. Analytics endpoint aggregates click data and displays it on the dashboard  

---

## API Design

- **POST /shorten**  
  Creates a short URL from the original link  

- **GET /:short_code**  
  Redirects to the original URL and logs the click  

- **GET /analytics/:short_code**  
  Returns click data and statistics  

---

## Tech Stack

### Frontend
- React  
- Framer Motion  
- Recharts  
- qrcode.react  

### Backend
- Node.js  
- Express.js  

### Database
- PostgreSQL (Supabase)  

### Deployment
- Vercel (frontend)  
- Render (backend)  

---

## Deployment

The application is fully deployed and accessible in production:

- Frontend hosted on Vercel  
- Backend API hosted on Render  
- Database managed using Supabase  

---

## Status

Fully functional and deployed.  
Supports real-time link redirection and analytics tracking.

