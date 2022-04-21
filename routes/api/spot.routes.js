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

router.post("/", async (req, res) => {
  try {
    const newSpot = await Spot.create(req.body);
    res.json(newSpot);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
});

router.put("/:spotId", async (req, res) => {
  try {
    const spotEdit = await Spot.findByIdAndUpdate(req.params.spotId, req.body, {
      new: true,
    });
    res.json(spotEdit);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
});

module.exports = router;
