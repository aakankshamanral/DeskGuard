import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import SeatPage from "./pages/SeatPage";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/seat/:seatId"
        element={
          <SeatPage />
        }
      />
    </Routes>
  </BrowserRouter>
);