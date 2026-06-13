import {
  motion,
} from "framer-motion";

import {
  useState,
} from "react";

import QRCode from "react-qr-code";

export default function SeatModal({
  selectedSeat,
  closeModal,
  seats,
  setSeats,
  setActivities,
}) {
  if (!selectedSeat)
    return null;

  const seat =
    seats.find(
      (s) =>
        s.id ===
        selectedSeat.id
    ) || selectedSeat;

  const [
    studentName,
    setStudentName,
  ] = useState(
    seat.studentName ||
      ""
  );

  const [
    rollNo,
    setRollNo,
  ] = useState(
    seat.rollNo || ""
  );

  /* CHECK IN */
  const handleCheckIn =
    () => {
      if (
        !studentName.trim() ||
        !rollNo.trim()
      ) {
        alert(
          "Enter name and roll number"
        );
        return;
      }

      setSeats(
        seats.map(
          (s) =>
            s.id ===
            seat.id
              ? {
                  ...s,
                  status:
                    "occupied",
                  studentName,
                  rollNo,
                  checkedInAt:
                    new Date(),
                  stillHereDue:
                    new Date(
                      Date.now() +
                        2 *
                          60 *
                          60 *
                          1000
                    ),
                }
              : s
        )
      );

      setActivities(
        (prev) => [
          {
            id:
              Date.now(),
            text: `${seat.id} checked in by ${studentName}`,
            color:
              "bg-green-500",
          },
          ...prev,
        ]
      );
    };

  /* AWAY */
  const handleAway =
    () => {
      setSeats(
        seats.map(
          (s) =>
            s.id ===
            seat.id
              ? {
                  ...s,
                  status:
                    "away",
                  awayUntil:
                    new Date(
                      Date.now() +
                        20 *
                          60 *
                          1000
                    ),
                }
              : s
        )
      );

      setActivities(
        (prev) => [
          {
            id:
              Date.now(),
            text: `${seat.id} marked Away`,
            color:
              "bg-yellow-400",
          },
          ...prev,
        ]
      );
    };

  /* STILL HERE */
  const handleStillHere =
    () => {
      setSeats(
        seats.map(
          (s) =>
            s.id ===
            seat.id
              ? {
                  ...s,
                  status:
                    "occupied",
                }
              : s
        )
      );

      setActivities(
        (prev) => [
          {
            id:
              Date.now(),
            text: `${seat.id} returned`,
            color:
              "bg-cyan-500",
          },
          ...prev,
        ]
      );
    };

  /* RELEASE */
  const handleRelease =
    () => {
      setSeats(
        seats.map(
          (s) =>
            s.id ===
            seat.id
              ? {
                  ...s,
                  status:
                    "free",
                  studentName:
                    "",
                  rollNo: "",
                  checkedInAt:
                    null,
                  stillHereDue:
                    null,
                  awayUntil:
                    null,
                }
              : s
        )
      );

      setActivities(
        (prev) => [
          {
            id:
              Date.now(),
            text: `${seat.id} released`,
            color:
              "bg-red-500",
          },
          ...prev,
        ]
      );

      closeModal();
    };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center px-4">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="bg-slate-900 rounded-[32px] border border-white/10 p-7 text-white w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between mb-5">

          <div>
            <h2 className="text-3xl font-black">
              {seat.id}
            </h2>

            <p className="text-slate-400">
              Status:
              {" "}
              {
                seat.status
              }
            </p>
          </div>

          <button
            onClick={
              closeModal
            }
          >
            ✕
          </button>
        </div>

        {seat.status ===
          "free" && (
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Student Name"
              value={
                studentName
              }
              onChange={(
                e
              ) =>
                setStudentName(
                  e.target
                    .value
                )
              }
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />

            <input
              type="text"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(
                e
              ) =>
                setRollNo(
                  e.target
                    .value
                )
              }
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={
                handleCheckIn
              }
              className="w-full bg-cyan-500 text-black font-bold py-4 rounded-2xl"
            >
              Check In
            </button>
          </div>
        )}

        {seat.status !==
          "free" && (
          <div className="mb-5 bg-white/5 p-4 rounded-2xl">
            <p>
              <strong>
                Student:
              </strong>{" "}
              {
                seat.studentName
              }
            </p>

            <p>
              <strong>
                Roll No:
              </strong>{" "}
              {
                seat.rollNo
              }
            </p>
          </div>
        )}

        {/* buttons */}
        {seat.status ===
          "occupied" && (
          <div className="grid grid-cols-2 gap-3 mb-4">

            <button
              onClick={
                handleAway
              }
              className="bg-yellow-400 text-black py-3 rounded-xl font-bold"
            >
              Away
            </button>

            <button
              onClick={
                handleStillHere
              }
              className="bg-cyan-500 text-black py-3 rounded-xl font-bold"
            >
              Still Here
            </button>

            <button
              onClick={
                handleRelease
              }
              className="col-span-2 bg-red-500 py-3 rounded-xl font-bold"
            >
              Release Seat
            </button>
          </div>
        )}

        {/* QR */}
        <div className="border-t border-white/10 pt-5">

          <div className="bg-white rounded-3xl p-5 flex justify-center mb-4">
            <QRCode
              value={`http://localhost:5173/scan?seat=${seat.id}`}
              size={170}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}