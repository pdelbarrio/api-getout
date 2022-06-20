const Spot = require("../models/spot.model");
const { setError } = require("../helpers/utils");

const getValidated = async (req, res, next) => {
  try {
    // const page = req.query.page ? parseInt(req.query.page) : 1;
    // const skip = (page - 1) * 20;
    const spots = await Spot.find({ validated: true }).sort({
      createdAt: "desc",
    });
    // .populate("uploader");

    return res.status(200).json({
      message: "Recovered validated spots",
      data: { spots: spots },
    });
  } catch (error) {
    return next(setError(500, "Failed to retrieve all spots"));
  }
};

const getAll = async (req, res, next) => {
  try {
    // const page = req.query.page ? parseInt(req.query.page) : 1;
    // const skip = (page - 1) * 20;
    const spots = await Spot.find()
      .sort({ createdAt: "desc" })
      .populate("uploader")
      .limit(20);

    return res.status(200).json({
      message: "Recovered all spots",
      data: { spots: spots },
    });
  } catch (error) {
    return next(setError(500, "Failed to retrieve all spots"));
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

const create = async (req, res, next) => {
  try {
    const spot = new Spot({ ...req.body, uploader: req.user._id });
    //const spot = new Spot({ ...req.body, uploader: req.user._id, {new: true} });

    const spotInBd = await spot.save();

    return res.status(201).json({
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

// const addToFavorites = async (req, res, next) => {
//   console.log(req.body);
//   console.log(req.user);
//   const { spotID } = req.body;
//   // console.log(req.user)
//   const { _id: userID } = req.user;
//   // console.log(req.body);
//   User.findById(userID)
//     .then((user) => {
//       if (user) {
//         const { favorites } = user;
//         if (!favorites.includes(spotID)) {
//           User.findByIdAndUpdate(
//             userID,
//             { $push: { favorites: spotID } },
//             { new: true }
//           )
//             .then((user) => res.redirect(`/spots/${spotID}`))
//             .catch((error) => next(error));
//         } else {
//           res.redirect(`spots/${spotID}`);
//         }
//       } else {
//         res.redirect(`spots/${spotID}`);
//       }
//     })
//     .catch((error) => next(error));
// };

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSpot,
  getValidated,
};
