const seats = Array.from({ length: 40 }, (_, i) => ({
  id: `D${i + 1}`,
  type: "single",
  status: "free",
  studentId: null,
}));

export const groupAreas = [
  {
    id: "G1",
    maxSeats: 5,
    occupied: 0,
  },
  {
    id: "G2",
    maxSeats: 5,
    occupied: 0,
  },
];

export default seats;