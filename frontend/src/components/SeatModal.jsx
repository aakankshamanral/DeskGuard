import QRCode from "react-qr-code";

export default function SeatModal({
  selectedSeat,
  closeModal,
}) {
  if (!selectedSeat) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-[30px] p-8 w-[420px] shadow-2xl">

        <h2 className="text-3xl font-bold mb-3">
          {selectedSeat.id}
        </h2>

        <p className="mb-4">
          Status:
          <span className="font-bold ml-2 capitalize">
            {selectedSeat.status}
          </span>
        </p>

        <div className="flex justify-center mb-6">
          <QRCode
            value={`deskguard://desk/${selectedSeat.id}`}
            size={150}
          />
        </div>

        <div className="flex flex-col gap-3">
          <button className="bg-blue-600 text-white py-3 rounded-xl">
            Check In
          </button>

          <button className="bg-yellow-400 py-3 rounded-xl">
            Away (20 min)
          </button>

          <button className="bg-green-600 text-white py-3 rounded-xl">
            Still Here
          </button>

          <button
            onClick={closeModal}
            className="bg-slate-200 py-3 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}