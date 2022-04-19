const router = require("express").Router();

const Spot = require("../../models/spot.model");

router.get("/", async (req, res) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
});

module.exports = router;
