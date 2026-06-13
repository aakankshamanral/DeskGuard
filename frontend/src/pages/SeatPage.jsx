import {
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../api";

export default function SeatPage() {
  const {
    seatId,
  } = useParams();

  const [status, setStatus] =
    useState("free");

  useEffect(() => {
    fetchSeat();
  }, []);

  const fetchSeat =
    async () => {
      try {
        const res =
          await API.get(
            "/seats"
          );

        const seat =
          res.data.find(
            (s) =>
              s.seat_number ===
              seatId
          );

        if (seat) {
          setStatus(
            seat.status
          );
        }
      } catch (err) {
        console.error(
          err
        );
      }
    };

  const handleCheckIn =
    async () => {
      await API.post(
        "/checkin",
        {
          seat_number:
            seatId,
        }
      );

      fetchSeat();
    };

  const handleAway =
    async () => {
      await API.post(
        "/away",
        {
          seat_number:
            seatId,
        }
      );

      fetchSeat();
    };

  const handleStillHere =
    async () => {
      await API.post(
        "/still-here",
        {
          seat_number:
            seatId,
        }
      );

      fetchSeat();
    };

  const color =
    status === "free"
      ? "bg-green-500"
      : status ===
        "occupied"
      ? "bg-red-500"
      : "bg-yellow-400";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="bg-white/10 border border-white/10 rounded-[40px] p-10 w-[500px] text-center backdrop-blur-xl">

        <h1 className="text-5xl font-black text-white">
          {seatId}
        </h1>

        <div
          className={`w-6 h-6 rounded-full mx-auto mt-5 ${color}`}
        />

        <p className="text-slate-300 mt-4 capitalize text-lg">
          {status}
        </p>

        <div className="space-y-4 mt-8">

          <button
            onClick={
              handleCheckIn
            }
            className="w-full bg-cyan-500 text-black font-bold py-4 rounded-2xl"
          >
            Check In
          </button>

          <button
            onClick={
              handleAway
            }
            className="w-full bg-yellow-400 text-black font-bold py-4 rounded-2xl"
          >
            Away (20 min)
          </button>

          <button
            onClick={
              handleStillHere
            }
            className="w-full bg-white text-black font-bold py-4 rounded-2xl"
          >
            Still Here
          </button>
        </div>
      </div>
    </div>
  );
}