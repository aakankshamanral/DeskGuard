const express =
  require("express");

const cors =
  require("cors");

const cron =
  require("node-cron");

const app =
  express();

/* middleware */
app.use(
  cors()
);

app.use(
  express.json()
);

/* in-memory seats */
let seats =
  global.seats ||
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

global.seats =
  seats;

/* HEALTH */
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

/* GET ALL SEATS */
app.get(
  "/api/seats",
  (
    req,
    res
  ) => {
    res.status(200).json(
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

    return res.json({
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

    seat.away_until =
      new Date(
        Date.now() +
          20 *
            60 *
            1000
      );

    return res.json({
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

    seat.still_here_due =
      new Date(
        Date.now() +
          2 *
            60 *
            60 *
            1000
      );

    return res.json({
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

    return res.json({
      message:
        "Seat reset",
      seat,
    });
  }
);

/* CRON */
if (
  !global.cronStarted
) {
  cron.schedule(
    "* * * * *",
    () => {
      const now =
        new Date();

      seats.forEach(
        (
          seat
        ) => {
          /* away expired */
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
              `${seat.seat_number} freed`
            );
          }

          /* abandoned */
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

  global.cronStarted =
    true;
}

/* local dev */
if (
  process.env
    .NODE_ENV !==
  "production"
) {
  const PORT =
    process.env.PORT ||
    5000;

  app.listen(
    PORT,
    () => {
      console.log(
        `Server running on port ${PORT}`
      );
    }
  );
}

/* vercel export */
module.exports =
  app;