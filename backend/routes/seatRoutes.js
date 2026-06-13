const express =
  require("express");

const router =
  express.Router();

/* TEST ROUTE */
router.get(
  "/",
  async (req, res) => {
    res.json([
      {
        seat_number:
          "D1",
        status:
          "free",
      },
      {
        seat_number:
          "D2",
        status:
          "occupied",
      },
    ]);
  }
);

module.exports =
  router;