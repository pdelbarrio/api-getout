const Spot = require("../models/spot.model");
const { setError } = require("../helpers/utils");

const getAll = async (req, res, next) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const spot = await Spot.findById(id);
    if (!spot) return next(setError(404, "Code not found"));
    return res.status(200).json({
      message: "Retrieved spot by id",
      data: { spot: spot },
    });
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
};

const create = async (req, res, next) => {
  try {
    const newSpot = await Spot.create(req.body);
    res.json(newSpot);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
};

module.exports = { getAll, getById, create };
