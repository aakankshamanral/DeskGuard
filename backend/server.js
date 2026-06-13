const express =
  require("express");

const cors =
  require("cors");

const cron =
  require("node-cron");

const app =
  express();

app.use(
  cors()
);

app.use(
  express.json()
);

/* 40 seats */
let seats =
  Array.from(
    { length: 40 },
    (_, i) => ({
      seat_number: `D${
        i + 1
      }`,
      status: "free",

      checked_in_at:
        null,

      away_until:
        null,

      still_here_due:
        null,

      abandoned:
        false,
    })
  );

/* GET ALL */
app.get(
  "/api/seats",
  (
    req,
    res
  ) => {
    res.json(
      seats
    );
  }
);

/* CHECK IN */
app.post(
  "/api/checkin",
  (
    req,
    res
  ) => {
    const {
      seat_number,
    } = req.body;

    const seat =
      seats.find(
        (
          s
        ) =>
          s.seat_number ===
          seat_number
      );

    if (!seat) {
      return res
        .status(
          404
        )
        .json({
          error:
            "Seat not found",
        });
    }

    seat.status =
      "occupied";

    seat.checked_in_at =
      new Date();

    /* next still here prompt */
    seat.still_here_due =
      new Date(
        Date.now() +
          2 *
            60 *
            60 *
            1000
      );

    seat.away_until =
      null;

    seat.abandoned =
      false;

    res.json({
      message:
        "Checked in",
      seat,
    });
  }
);

/* AWAY */
app.post(
  "/api/away",
  (
    req,
    res
  ) => {
    const {
      seat_number,
    } = req.body;

    const seat =
      seats.find(
        (
          s
        ) =>
          s.seat_number ===
          seat_number
      );

    if (!seat) {
      return res
        .status(
          404
        )
        .json({
          error:
            "Seat not found",
        });
    }

    seat.status =
      "away";

    /* 20 mins */
    seat.away_until =
      new Date(
        Date.now() +
          20 *
            60 *
            1000
      );

    res.json({
      message:
        "Away mode started",
      seat,
    });
  }
);

/* STILL HERE */
app.post(
  "/api/still-here",
  (
    req,
    res
  ) => {
    const {
      seat_number,
    } = req.body;

    const seat =
      seats.find(
        (
          s
        ) =>
          s.seat_number ===
          seat_number
      );

    if (!seat) {
      return res
        .status(
          404
        )
        .json({
          error:
            "Seat not found",
        });
    }

    seat.status =
      "occupied";

    /* reset 2hr timer */
    seat.still_here_due =
      new Date(
        Date.now() +
          2 *
            60 *
            60 *
            1000
      );

    res.json({
      message:
        "Confirmed",
      seat,
    });
  }
);

/* RESET */
app.post(
  "/api/reset",
  (
    req,
    res
  ) => {
    const {
      seat_number,
    } = req.body;

    const seat =
      seats.find(
        (
          s
        ) =>
          s.seat_number ===
          seat_number
      );

    if (!seat) {
      return res
        .status(
          404
        )
        .json({
          error:
            "Seat not found",
        });
    }

    seat.status =
      "free";

    seat.checked_in_at =
      null;

    seat.away_until =
      null;

    seat.still_here_due =
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

/* CRON SWEEPER */
cron.schedule(
  "* * * * *",
  () => {
    console.log(
      "Running seat sweep..."
    );

    const now =
      new Date();

    seats.forEach(
      (seat) => {
        /* away timer expired */
        if (
          seat.away_until &&
          now >
            new Date(
              seat.away_until
            )
        ) {
          seat.status =
            "free";

          seat.away_until =
            null;

          console.log(
            `${seat.seat_number} freed from away timeout`
          );
        }

        /* still here missed */
        if (
          seat.still_here_due &&
          now >
            new Date(
              seat.still_here_due
            )
        ) {
          seat.status =
            "free";

          seat.abandoned =
            true;

          seat.checked_in_at =
            null;

          seat.still_here_due =
            null;

          console.log(
            `${seat.seat_number} abandoned`
          );
        }
      }
    );
  }
);

app.get(
  "/",
  (
    req,
    res
  ) => {
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