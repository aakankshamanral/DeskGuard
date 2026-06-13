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
  `${BASE_URL}/scan?seat=${seat.id}`;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-white/10 rounded-[35px] p-8 w-[380px] relative">

        <button
          onClick={close}
          className="absolute top-5 right-5 text-slate-400"
        >
          <X />
        </button>

        <h2 className="text-3xl font-black text-white text-center">
          {seat.id}
        </h2>

        <p className="text-slate-400 text-center mt-2">
          Scan to access seat
        </p>

        <div className="bg-white rounded-[25px] p-5 mt-6 flex justify-center">
          <QRCode
            value={qrValue}
            size={220}
          />
        </div>

        <p className="text-center text-cyan-400 mt-5 text-sm">
          Unique QR for
          {` ${seat.id}`}
        </p>
      </div>
    </div>
  );
}