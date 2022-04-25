const SpotRoutes = require("express").Router();
const {
  getAll,
  create,
  getById,
} = require("../../controllers/spot.controller");

const Spot = require("../../models/spot.model");

SpotRoutes.get("/", getAll);
SpotRoutes.post("/", create);
SpotRoutes.get("/:spotId", getById);

SpotRoutes.put("/:spotId", async (req, res) => {
  try {
    const spotEdit = await Spot.findByIdAndUpdate(req.params.spotId, req.body, {
      new: true,
    });
    res.json(spotEdit);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
});

SpotRoutes.delete("/:spotId", async (req, res) => {
  try {
    const spot = await Spot.findByIdAndDelete(req.params.spotId);
    res.json(spot);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
});

module.exports = SpotRoutes;
