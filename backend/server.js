const express =
  require("express");

const cors =
  require("cors");

const cron =
  require("node-cron");

const app =
  express();

app.use(
  cors({
    origin:
      "http://localhost:5173",
  })
);

app.use(
  express.json()
);

/* In-memory seat status */
let seats = Array.from(
  { length: 40 },
  (_, i) => ({
    seat_number: `D${i + 1}`,
    status: "free",
    checked_in_at: null,
    away_until: null,
    last_response_at:
      null,
    abandoned: false,
  })
);

/* GET ALL SEATS */
app.get(
  "/api/seats",
  (req, res) => {
    res.json(seats);
  }
);

/* CHECK IN */
app.post(
  "/api/checkin",
  (req, res) => {
    const {
      seat_number,
    } = req.body;

    const seat =
      seats.find(
        (s) =>
          s.seat_number ===
          seat_number
      );

    if (!seat) {
      return res
        .status(404)
        .json({
          message:
            "Seat not found",
        });
    }

    seat.status =
      "occupied";

    seat.checked_in_at =
      new Date();

    seat.last_response_at =
      new Date();

    seat.abandoned =
      false;

    res.json({
      message:
        "Checked in",
      seat,
    });
  }
);

/* AWAY MODE */
app.post(
  "/api/away",
  (req, res) => {
    const {
      seat_number,
    } = req.body;

    const seat =
      seats.find(
        (s) =>
          s.seat_number ===
          seat_number
      );

    if (!seat) {
      return res
        .status(404)
        .json({
          message:
            "Seat not found",
        });
    }

    seat.status =
      "away";

    seat.away_until =
      new Date(
        Date.now() +
          20 *
            60 *
            1000
      );

    res.json({
      message:
        "Away mode activated",
      seat,
    });
  }
);

/* STILL HERE */
app.post(
  "/api/still-here",
  (req, res) => {
    const {
      seat_number,
    } = req.body;

    const seat =
      seats.find(
        (s) =>
          s.seat_number ===
          seat_number
      );

    if (!seat) {
      return res
        .status(404)
        .json({
          message:
            "Seat not found",
        });
    }

    seat.last_response_at =
      new Date();

    seat.status =
      "occupied";

    res.json({
      message:
        "Seat confirmed",
      seat,
    });
  }
);

/* RESET */
app.post(
  "/api/reset",
  (req, res) => {
    const {
      seat_number,
    } = req.body;

    const seat =
      seats.find(
        (s) =>
          s.seat_number ===
          seat_number
      );

    if (!seat) {
      return res
        .status(404)
        .json({
          message:
            "Seat not found",
        });
    }

    seat.status =
      "free";

    seat.checked_in_at =
      null;

    seat.away_until =
      null;

    seat.last_response_at =
      null;

    seat.abandoned =
      false;

    res.json({
      message:
        "Seat reset",
      seat,
    });
  }
);

/* CRON JOB */
cron.schedule(
  "* * * * *",
  () => {
    console.log(
      "Checking seat timers..."
    );

    seats.forEach(
      (seat) => {
        const now =
          new Date();

        /* away timeout */
        if (
          seat.away_until &&
          now >
            seat.away_until
        ) {
          seat.status =
            "free";

          seat.away_until =
            null;
        }

        /* 2 hour still here timeout */
        if (
          seat.last_response_at
        ) {
          const diff =
            now -
            new Date(
              seat.last_response_at
            );

          if (
            diff >
            2 *
              60 *
              60 *
              1000
          ) {
            seat.status =
              "free";

            seat.abandoned =
              true;

            seat.checked_in_at =
              null;
          }
        }
      }
    );
  }
);

app.get(
  "/",
  (req, res) => {
    res.send(
      "DeskGuard API Running"
    );
  }
);

app.listen(
  5000,
  () => {
    console.log(
      "Server running on port 5000"
    );
  }
);