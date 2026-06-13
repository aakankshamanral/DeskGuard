import QRCode from "react-qr-code";
import { X } from "lucide-react";

export default function QRModal({
  seat,
  close,
}) {
  if (!seat) return null;

  const BASE_URL =
  "https://desk-guard-three.vercel.app";

const qrValue =
  seat.isGroup
    ? `${BASE_URL}/group/${seat.id}`
    : `${BASE_URL}/seat/${seat.id}`;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">

      <div className="bg-slate-900 border border-white/10 rounded-[35px] p-8 w-[380px] relative">

        <button
          onClick={close}
          className="absolute right-5 top-5 text-slate-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-white text-2xl font-bold text-center">
          {seat.id}
        </h2>

        <p className="text-slate-400 text-sm text-center mt-2">
          Scan to check in
        </p>

        <div className="bg-white rounded-[25px] p-6 mt-6 flex justify-center">
          <QRCode
            value={qrValue}
            size={220}
          />
        </div>

        <p className="text-center text-cyan-400 mt-5 text-sm">
          {seat.isGroup
            ? "Books entire group study area"
            : "Unique desk QR"}
        </p>
      </div>
    </div>
  );
}