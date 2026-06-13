import { motion } from "framer-motion";

const seatColors = {
  free: "#22C55E",
  occupied: "#EF4444",
  away: "#FACC15",
};

export default function Seat({
  seat,
  x,
  y,
  onClick,
}) {
  const color =
    seatColors[seat.status];

  return (
    <motion.g
      onClick={() => onClick(seat)}
      className="cursor-pointer"
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.18,
      }}
    >
      {/* Seat body */}
      <rect
        x={x}
        y={y}
        rx="18"
        width="90"
        height="55"
        fill={color}
        style={{
          transition:
            "filter 0.2s ease",
          filter:
            "drop-shadow(0px 3px 6px rgba(0,0,0,0.18))",
        }}
      />

      {/* top shine */}
      <rect
        x={x + 5}
        y={y + 5}
        rx="10"
        width="80"
        height="10"
        fill="rgba(255,255,255,0.14)"
      />

      {/* label */}
      <text
        x={x + 45}
        y={y + 33}
        textAnchor="middle"
        fill="white"
        fontWeight="700"
        fontSize="14"
        style={{
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {seat.id}
      </text>
    </motion.g>
  );
}