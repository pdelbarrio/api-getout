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
    const foundSpot = await Spot.findById(id);
    if (!foundSpot) return next(setError(404, "Code not found"));
    return res.status(200).json({
      message: "Retrieved spot by id",
      data: foundSpot,
    });
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
};

// const create = async (req, res, next) => {
//   try {
//     const newSpot = await Spot.create(req.body);
//     res.json(newSpot);
//   } catch (error) {
//     res.status(500).json({ error: "An error has ocurred" });
//   }
// };

const create = async (req, res, next) => {
  try {
    const spot = new Spot({ ...req.body, uploader: req.user._id });
    console.log(req);
    const spotInBd = await spot.save();

    return res.json({
      status: 201,
      message: "Created new spot",
      data: { spot: spotInBd },
    });
  } catch (error) {
    console.log(error);
    return next(setError(500, error.message | "Failed to create spot"));
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const spot = new Spot(req.body);
    spot._id = id;
    const updatedSpot = await Spot.findByIdAndUpdate(id, spot, { new: true });
    return res.json(updatedSpot);
  } catch (error) {
    return next(setError(500, "Failed to update spot"));
  }
};

const deleteSpot = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSpot = await Spot.findByIdAndDelete(id);
    if (!deletedSpot) return next(setError(404, "Spot not found"));

    return res.json(deletedSpot);
  } catch (error) {
    return next(setError(500, "Failed to delete spot"));
  }
};
module.exports = { getAll, getById, create, update, deleteSpot };
