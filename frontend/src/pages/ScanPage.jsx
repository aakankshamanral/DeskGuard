import {
  useSearchParams,
} from "react-router-dom";

export default function ScanPage() {
  const [searchParams] =
    useSearchParams();

  const seatId =
    searchParams.get(
      "seat"
    );

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 w-[500px] text-center">

        <h1 className="text-5xl font-black text-white">
          DeskGuard
        </h1>

        {!seatId ? (
          <>
            <p className="text-red-400 mt-6 text-lg">
              No seat detected
            </p>

            <p className="text-slate-400 mt-2">
              Please scan a
              valid QR code.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-4xl text-cyan-400 font-bold mt-6">
              Seat {seatId}
            </h2>

            <p className="text-slate-400 mt-3">
              Ready to check in?
            </p>

            <button className="w-full mt-8 bg-cyan-500 text-black font-bold py-4 rounded-2xl">
              Check In
            </button>

            <button className="w-full mt-4 bg-yellow-400 text-black font-bold py-4 rounded-2xl">
              Away (20 mins)
            </button>

            <button className="w-full mt-4 bg-white text-black font-bold py-4 rounded-2xl">
              Still Here
            </button>
          </>
        )}
      </div>
    </div>
  );
}