# DeskGuard – Library Seat Booking & Anti-Hoarding System

## Overview

DeskGuard is a smart **library seat management and anti-hoarding web application** designed to solve the problem of unfair desk occupancy in libraries. Students often reserve seats by leaving personal belongings and remaining absent for long periods, making it difficult for others to find available study spaces.

DeskGuard provides a **real-time, transparent, and fair seat allocation system** through live seat tracking, QR-based check-ins, away mode, and occupancy monitoring.

---

## Problem Statement

Libraries frequently face inefficient seat utilization due to **seat hoarding**, lack of **real-time occupancy tracking**, and unfair desk allocation.

Students often occupy desks by leaving bags or belongings and staying away for long durations, while other students struggle to find available study spaces. Additionally, librarians face challenges in effectively monitoring desk usage and abandoned seats.

DeskGuard addresses these issues through a **smart real-time library seat management system**.

---

## Key Features

### 1. Real-Time Seat Availability

Students can instantly view seat availability through a **live dashboard**, showing desk status in real time.

### 2. Color-Coded Seat Map

Desk statuses are visually represented using colors:

* 🟢 **Green** → Available
* 🔴 **Red** → Occupied
* 🟡 **Yellow** → Away

This improves visibility and quick decision-making.

### 3. QR-Based Seat Check-In

Each desk contains a QR code that students scan to check in and occupy a seat securely.

### 4. Seat Search Functionality

Students can quickly search for desks using **seat/desk IDs**.

### 5. Away Mode

Users can temporarily leave their desk by activating **Away Mode**, preventing immediate seat loss while discouraging long-term hoarding.

### 6. Live Dashboard Monitoring

The system updates desk occupancy instantly, allowing students and librarians to monitor seat usage.

### 7. Group Study Zone Support

Dedicated seating areas for collaborative learning and group discussions.

### 8. Student Check-In Details

Students enter **name and roll number** during check-in for better tracking and accountability.

### 9. Responsive Interface

The application works smoothly across desktop and mobile devices.

---

## How It Works

1. Student opens the DeskGuard portal.
2. The live dashboard displays available, occupied, and away seats.
3. Student searches or selects a seat.
4. Student scans the desk QR code to check in.
5. Seat status changes to **Occupied**.
6. Student may activate **Away Mode** if leaving temporarily.
7. Dashboard updates in real time for all users.

---

## Tech Stack

### Frontend

* **React.js** – Dynamic user interface development
* **Tailwind CSS** – Responsive and modern styling
* **Framer Motion** – Smooth animations and transitions

### Backend

* **Node.js** – Server-side runtime environment
* **Express.js** – API and backend route handling

### Database

* **PostgreSQL / Firebase** – User and seat occupancy data storage

### Tools & Deployment

* **QR Code Integration** – Secure desk check-in system
* **GitHub** – Version control and collaboration
* **Vercel** – Frontend deployment

---

## Folder Structure

```plaintext
DeskGuard/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│── package.json
│── README.md
```

---

## Future Scope

### Automatic Abandoned Seat Detection

The system can automatically detect inactive desks and free them for other students.

### Seat Expiry Notifications

Students can receive alerts before their seat reservation or away timer expires.

### Improved QR Compatibility

Enhancing QR scanning for better support across different mobile devices and cameras.

### Advanced Analytics Dashboard

Librarians can monitor occupancy trends and peak library usage hours.

### Mobile Application

A dedicated mobile app for easier access and faster seat tracking.

---

## Conclusion

DeskGuard provides a **smart, fair, and user-friendly solution for library seat management** by improving seat accessibility, reducing seat hoarding, and enabling real-time occupancy tracking.

---
