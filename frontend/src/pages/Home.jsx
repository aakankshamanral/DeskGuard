import {
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
import SeatModal from "../components/SeatModal";

import seatsData from "../data/seats";

export default function Home() {
  const [seats, setSeats] =
  useState(
    seatsData.map(
      (seat) => ({
        ...seat,
        status: "free",
        studentName: "",
        rollNo: "",
        checkedInAt: null,
        stillHereDue: null,
        awayUntil: null,
      })
    )
  );

  const [
    selectedSeat,
    setSelectedSeat,
  ] = useState(null);

  const [
    activities,
    setActivities,
  ] = useState([]);

  const [searchSeat, setSearchSeat] =
    useState("");

  const [searchResult, setSearchResult] =
    useState(null);

  const occupied =
    useMemo(
      () =>
        seats.filter(
          (s) =>
            s.status ===
            "occupied"
        ).length,
      [seats]
    );

  const away =
    useMemo(
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
        <div className="mb-5">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] px-5 py-4 flex items-center gap-3">

            <Search className="text-slate-400" />

            <input
              type="text"
              placeholder="Search seat (D12)"
              value={searchSeat}
              onChange={(e) => {
                const value =
                  e.target.value.toUpperCase();

                setSearchSeat(
                  value
                );

                const foundSeat =
                  seats.find(
                    (seat) =>
                      seat.id ===
                      value
                  );

                setSearchResult(
                  foundSeat ||
                    null
                );
              }}
              className="bg-transparent outline-none text-white w-full"
            />
          </div>
        </div>

        {/* search result */}
        {searchResult && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] p-5"
          >
            <div className="flex justify-between items-center">

              <div>
                <h3 className="text-white text-xl font-bold">
                  {
                    searchResult.id
                  }
                </h3>

                <p className="text-slate-400 capitalize">
                  Status:
                  {" "}
                  {
                    searchResult.status
                  }
                </p>

                {searchResult.checkedInAt && (
                  <p className="text-slate-500 text-sm mt-1">
                    Checked In:
                    {" "}
                    {new Date(
                      searchResult.checkedInAt
                    ).toLocaleTimeString()}
                  </p>
                )}
              </div>

              <button
                onClick={() =>
                  setSelectedSeat(
                    searchResult
                  )
                }
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2 rounded-xl"
              >
                View Seat
              </button>
            </div>
          </motion.div>
        )}

        {/* layout */}
        <div className="grid grid-cols-[1fr_240px] gap-5 items-start">

          {/* MAP */}
          <div className="min-w-0">
            <LibraryMap
              seats={seats}
              openSeat={(seat) =>
                setSelectedSeat(
                  seat
                )
              }
            />
          </div>

          {/* sidebar */}
          <div className="space-y-5 sticky top-8">

            {/* live activity */}
            <motion.div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] p-4">

              <h2 className="text-white font-bold text-sm mb-4">
                Live Activity
              </h2>

              <div className="space-y-3">

                {activities.length ===
                0 ? (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                    <p className="text-slate-500 text-sm">
                      No activity yet
                    </p>
                  </div>
                ) : (
                  activities.map(
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

      <SeatModal
        selectedSeat={
          selectedSeat
        }
        closeModal={() =>
          setSelectedSeat(
            null
          )
        }
        seats={seats}
        setSeats={
          setSeats
        }
        setActivities={
          setActivities
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