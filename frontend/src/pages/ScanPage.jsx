import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import API from "../api";

export default function ScanPage() {
  const [searchParams] =
    useSearchParams();

  const seatId =
    searchParams.get(
      "seat"
    );

  const [seat, setSeat] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const fetchSeat =
    async () => {
      try {
        const res =
          await API.get(
            "/seats"
          );

        const foundSeat =
          res.data.find(
            (s) =>
              s.seat_number ===
              seatId
          );

        setSeat(
          foundSeat
        );
      } catch (err) {
        console.error(
          err
        );
      }
    };

  useEffect(() => {
    fetchSeat();

    const interval =
      setInterval(
        fetchSeat,
        3000
      );

    return () =>
      clearInterval(
        interval
      );
  }, []);

  const handleCheckIn =
    async () => {
      try {
        setLoading(
          true
        );

        await API.post(
          "/checkin",
          {
            seat_number:
              seatId,
          }
        );

        fetchSeat();
      } catch (
        error
      ) {
        console.error(
          error
        );
      }

      setLoading(
        false
      );
    };

  const handleAway =
    async () => {
      try {
        await API.post(
          "/away",
          {
            seat_number:
              seatId,
          }
        );

        fetchSeat();
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  const handleStillHere =
    async () => {
      try {
        await API.post(
          "/still-here",
          {
            seat_number:
              seatId,
          }
        );

        fetchSeat();
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  const statusColor =
    seat?.status ===
    "occupied"
      ? "bg-red-500"
      : seat?.status ===
        "away"
      ? "bg-yellow-400"
      : "bg-green-500";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 w-[500px]">

        <h1 className="text-5xl font-black text-white text-center">
          DeskGuard
        </h1>

        <h2 className="text-3xl text-cyan-400 font-bold text-center mt-4">
          Seat {seatId}
        </h2>

        <div
          className={`w-5 h-5 rounded-full mx-auto mt-5 ${statusColor}`}
        />

        <p className="text-center text-slate-300 mt-4 capitalize text-lg">
          {seat?.status ||
            "Loading..."}
        </p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mt-8">
          <h3 className="text-slate-400 text-sm">
            Current Status
          </h3>

          <p className="text-white text-2xl font-bold mt-2">
            {seat?.status ===
            "occupied"
              ? "Currently Studying"
              : seat?.status ===
                "away"
              ? "Away Mode Active"
              : "Available"}
          </p>
        </div>

        <div className="space-y-4 mt-8">

          <button
            onClick={
              handleCheckIn
            }
            disabled={
              loading
            }
            className="w-full bg-cyan-500 text-black font-bold py-4 rounded-2xl"
          >
            {loading
              ? "Checking In..."
              : "Check In"}
          </button>

          <button
            onClick={
              handleAway
            }
            className="w-full bg-yellow-400 text-black font-bold py-4 rounded-2xl"
          >
            Away
            (20 mins)
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