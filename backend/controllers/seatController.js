const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result =
      await pool.query(`
        SELECT *
        FROM seats
        ORDER BY id
      `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "Failed to fetch seats",
      });
  }
});

module.exports = router;