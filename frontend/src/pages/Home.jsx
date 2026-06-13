import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Users,
  Clock3,
  Armchair,
} from "lucide-react";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import LibraryMap from "../components/LibraryMap";
import QRModal from "../components/QRModal";

import API from "../api";
import seatsData from "../data/seats";

export default function Home() {
  const [seats, setSeats] =
    useState(seatsData);

  const [qrSeat, setQrSeat] =
    useState(null);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats =
    async () => {
      try {
        const res =
          await API.get(
            "/seats"
          );

        const updatedSeats =
          seatsData.map(
            (seat) => {
              const backendSeat =
                res.data.find(
                  (s) =>
                    s.seat_number ===
                    seat.id
                );

              return {
                ...seat,
                status:
                  backendSeat?.status ||
                  "free",
              };
            }
          );

        setSeats(
          updatedSeats
        );
      } catch (error) {
        console.error(
          "FETCH ERROR:",
          error
        );
      }
    };

  const activities = [
    {
      id: 1,
      text: "D12 checked in",
      color: "bg-green-500",
    },
    {
      id: 2,
      text: "D8 marked Away",
      color: "bg-yellow-400",
    },
    {
      id: 3,
      text: "D31 auto-freed",
      color: "bg-red-500",
    },
    {
      id: 4,
      text:
        "Group Study B occupied",
      color: "bg-cyan-500",
    },
  ];

  const occupied = useMemo(
    () =>
      seats.filter(
        (s) =>
          s.status ===
          "occupied"
      ).length,
    [seats]
  );

  const away = useMemo(
    () =>
      seats.filter(
        (s) =>
          s.status ===
          "away"
      ).length,
    [seats]
  );

  const free =
    seats.length -
    occupied -
    away;

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">

      {/* glow */}
      <div className="absolute top-[-120px] left-[-120px] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

      <Navbar />

      <div className="max-w-[1700px] mx-auto px-6 py-8">

        {/* heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-slate-300">
            Live Library Dashboard
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Track desk occupancy,
            away mode &
            study spaces
            in real time.
          </p>
        </motion.div>

        {/* stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <StatCard
            title="Seats"
            value="40"
            icon={<Armchair />}
          />

          <StatCard
            title="Occupied"
            value={occupied}
            icon={<Users />}
          />

          <StatCard
            title="Away"
            value={away}
            icon={<Clock3 />}
          />

          <StatCard
            title="Available"
            value={free}
            icon={<Armchair />}
          />
        </div>

        {/* search */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] px-5 py-4 flex items-center gap-3">
            <Search className="text-slate-400" />

            <input
              type="text"
              placeholder="Search seat (D12)"
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
        </div>

        {/* layout */}
        <div className="grid grid-cols-[1fr_240px] gap-5 items-start">

          {/* map */}
          <div className="min-w-0">
            <LibraryMap
              seats={seats}
              openSeat={(seat) =>
                setQrSeat(
                  seat
                )
              }
            />
          </div>

          {/* sidebar */}
          <div className="space-y-5 sticky top-8">

            {/* activity */}
            <motion.div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] p-4">

              <h2 className="text-white font-bold text-sm mb-4">
                Live Activity
              </h2>

              <div className="space-y-3">
                {activities.map(
                  (
                    activity
                  ) => (
                    <div
                      key={
                        activity.id
                      }
                      className="bg-white/5 rounded-xl p-3 border border-white/5"
                    >
                      <div className="flex gap-2 items-start">

                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 ${activity.color}`}
                        />

                        <p className="text-xs text-slate-200">
                          {
                            activity.text
                          }
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* rules */}
            <motion.div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] p-5">

              <h2 className="text-white font-bold text-sm mb-4">
                Library Rules
              </h2>

              <div className="space-y-3 text-xs text-slate-300">
                <Rule text="Maintain silence in study zones." />

                <Rule text="Food & drinks are not allowed near desks." />

                <Rule text="Keep your desk clean after use." />

                <Rule text="Use group rooms for collaborative work only." />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* QR modal */}
      <QRModal
        seat={qrSeat}
        close={() =>
          setQrSeat(null)
        }
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <motion.div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-black mt-2">
            {value}
          </h2>
        </div>

        <div className="bg-cyan-500/20 p-4 rounded-2xl text-cyan-400">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function Rule({
  text,
}) {
  return (
    <div className="flex gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
      <p>{text}</p>
    </div>
  );
}