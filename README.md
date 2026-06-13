# DeskGuard – Library Seat Booking & Anti-Hoarding System

## Overview

DeskGuard is a **smart library seat booking and anti-hoarding web application** designed to improve seat utilization and fairness in libraries. Students often reserve study desks by leaving bags or belongings and remaining absent for long periods, making it difficult for others to find available study spaces.

DeskGuard solves this issue through **real-time seat tracking, QR-based desk check-ins, live occupancy monitoring, and temporary away mode support**. The system helps students easily find available desks while assisting librarians in managing occupancy efficiently.

---

## Problem Statement

Libraries frequently face problems such as:

* **Seat hoarding** by students leaving personal belongings for long periods
* **No real-time occupancy tracking** to identify available desks
* **Unfair desk allocation**, preventing genuine students from studying
* **Inefficient seat management** for librarians

DeskGuard addresses these challenges by introducing a **smart, transparent, and fair seat management system**.

---

## Features

### 📍 Real-Time Seat Tracking

Students can instantly check which seats are **available, occupied, or temporarily away**.

### 🔍 Seat Search Functionality

Quickly search desks using **seat IDs or desk numbers**.

### 🎨 Color-Coded Seat Map

Seat availability is represented visually:

* 🟢 **Green** → Available
* 🔴 **Red** → Occupied
* 🟡 **Yellow** → Away

This makes navigation fast and intuitive.

### 📱 QR Code Check-In

Students can scan desk-specific QR codes to **check in securely and occupy seats**.

### ⏳ Away Mode

Users can temporarily leave their desk while retaining their seat for a limited period.

### 📊 Live Dashboard

A real-time dashboard displays:

* Total seats
* Occupied seats
* Available seats
* Away seats

### 👥 Group Study Zones

Dedicated areas for collaborative learning and group discussions.

### 🧾 Student Check-In Details

Students enter **name and roll number** while checking in for better seat tracking.

### 📲 Responsive Interface

The platform is optimized for **desktop and mobile devices**.

---

## System Workflow

1. Open the DeskGuard portal.
2. View the live library seat map.
3. Search or select an available seat.
4. Scan the QR code to check in.
5. Seat status changes to **Occupied**.
6. Use **Away Mode** if leaving temporarily.
7. Dashboard updates in real time.

---

## Project Structure

```plaintext id="p48m2v"
DESKGUARD/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── jobs/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── README.md
│
│── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── LibraryMap.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── QRModal.jsx
│   │   │   ├── Seat.jsx
│   │   │   └── SeatModal.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ScanPage.jsx
│   │   │   └── SeatPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── README.md
│
│── docs/
│── README.md
```

---

## Tech Stack

### Frontend

* **React.js** – Dynamic and reusable UI components
* **Tailwind CSS** – Responsive styling and design
* **Framer Motion** – Smooth UI animations

### Backend

* **Node.js** – Server-side runtime
* **Express.js** – API and route handling

### Database

* **PostgreSQL / Firebase** – Seat occupancy and user data storage

### Tools & Deployment

* **QR Code Integration** – Seat check-in mechanism
* **GitHub** – Version control and collaboration
* **Vercel** – Frontend deployment

---

## Future Scope

### 🤖 Automatic Abandoned Seat Detection

Automatically detect inactive desks and release them for other students.

### 🔔 Seat Expiry Notifications

Notify students before their away timer or reservation expires.

### 📷 Better QR Compatibility

Improve QR scanning performance across different mobile devices and cameras.

### 📈 Advanced Admin Dashboard

Provide detailed occupancy analytics and usage trends for librarians.

### 📱 Mobile Application

Develop a dedicated mobile app for faster and easier access.

---

## Conclusion

DeskGuard provides a **smart, fair, and user-friendly solution for library seat management** by reducing seat hoarding, improving seat accessibility, and enabling real-time occupancy tracking.
