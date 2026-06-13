import Seat from "./Seat";
import { motion } from "framer-motion";

export default function LibraryMap({
  seats,
  openSeat,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 backdrop-blur-xl shadow-2xl p-8"
    >
      {/* background glow */}
      <div className="absolute top-0 left-0 h-72 w-72 bg-cyan-500/5 blur-[140px]" />

      <div className="relative z-10 flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-black text-white">
            Live Library Map
          </h2>

          <p className="text-slate-400 mt-1">
            Real-time seat occupancy
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Legend
            color="bg-green-500"
            label="Free"
          />

          <Legend
            color="bg-red-500"
            label="Occupied"
          />

          <Legend
            color="bg-yellow-400"
            label="Away"
          />
        </div>
      </div>

      <svg
        viewBox="0 0 1400 1080"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* floor */}
        <rect
          x="20"
          y="20"
          width="1360"
          height="1020"
          rx="40"
          fill="#020617"
          stroke="#1E293B"
          strokeWidth="2"
        />

        {/* title */}
        <text
          x="700"
          y="70"
          textAnchor="middle"
          fill="#CBD5E1"
          fontWeight="600"
          fontSize="18"
          pointerEvents="none"
        >
          Silent Study Zone
        </text>

        {/* seats */}
        {seats.map(
          (seat, index) => {
            const col =
              index % 8;

            const row =
              Math.floor(
                index / 8
              );

            const x =
              140 +
              col * 135;

            const y =
              110 +
              row * 105;

            return (
              <g
                key={
                  seat.id
                }
                onClick={() =>
                  openSeat(
                    seat
                  )
                }
                style={{
                  cursor:
                    "pointer",
                  pointerEvents:
                    "all",
                }}
              >
                <Seat
                  seat={seat}
                  x={x}
                  y={y}
                />
              </g>
            );
          }
        )}

        {/* walkway */}
        <rect
          x="100"
          y="650"
          width="1200"
          height="10"
          rx="20"
          fill="#1E293B"
          opacity="0.4"
          pointerEvents="none"
        />

        {/* study rooms */}
        <StudyRoom
          x={70}
          y={720}
          title="Group Study A"
        />

        <StudyRoom
          x={560}
          y={720}
          title="Group Study B"
        />

        <StudyRoom
          x={1050}
          y={720}
          title="Group Study C"
        />
      </svg>
    </motion.div>
  );
}

function StudyRoom({
  x,
  y,
  title,
}) {
  const centerX =
    x + 140;

  const centerY =
    y + 120;

  const radius = 58;

  const seatPositions =
    Array.from(
      { length: 5 },
      (_, i) => {
        const angle =
          ((Math.PI *
            2) /
            5) *
            i -
          Math.PI / 2;

        return {
          x:
            centerX +
            radius *
              Math.cos(
                angle
              ),
          y:
            centerY +
            radius *
              Math.sin(
                angle
              ),
        };
      }
    );

  return (
    <g>
      {/* room */}
      <rect
        x={x}
        y={y}
        width="280"
        height="240"
        rx="28"
        fill="#0F172A"
        stroke="#1E293B"
        strokeWidth="2"
      />

      {/* glass */}
      <rect
        x={x + 8}
        y={y + 8}
        width="264"
        height="224"
        rx="22"
        fill="#111827"
        opacity="0.8"
      />

      {/* title */}
      <text
        x={centerX}
        y={y + 38}
        textAnchor="middle"
        fill="#E2E8F0"
        fontWeight="600"
        fontSize="18"
        pointerEvents="none"
      >
        {title}
      </text>

      {/* table */}
      <circle
        cx={centerX}
        cy={centerY}
        r="42"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="2"
      />

      {/* seats */}
      {seatPositions.map(
        (
          seat,
          index
        ) => (
          <circle
            key={index}
            cx={seat.x}
            cy={seat.y}
            r="16"
            fill="#22C55E"
            pointerEvents="none"
          />
        )
      )}

      {/* capacity */}
      <text
        x={centerX}
        y={y + 210}
        textAnchor="middle"
        fill="#64748B"
        fontSize="13"
        pointerEvents="none"
      >
        Capacity • 5
        Students
      </text>
    </g>
  );
}

function Legend({
  color,
  label,
}) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
      <div
        className={`w-3 h-3 rounded-full ${color}`}
      />

      <span className="text-slate-300 text-sm">
        {label}
      </span>
    </div>
  );
}