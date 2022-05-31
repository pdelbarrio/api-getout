const Favorite = require("../models/favorite.model");
const { setError } = require("../helpers/utils");

// Async?? en front
const favoritenumber = (req, res, next) => {
  //Find favorite information inside Favorite Collection by Spot ID
  console.log(req.body);
  Favorite.find({ spotId: req.body.spotId }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoritenumber: favorite.length });
  });
};

const addtofavorites = (req, res, next) => {
  //Save the information about the spot or userId inside favorite collection
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

const removefromfavorites = (req, res, next) => {
  Favorite.findOneAndDelete({
    spotId: req.body.spotId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
};

const getfavoritespots = (req, res, next) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
};

const favorited = (req, res, next) => {
  //Find favorite information inside Favorite Collection by Spot ID, userFrom
  Favorite.find({ spotId: req.body.spotId, userFrom: req.body.userFrom }).exec(
    (err, favorite) => {
      if (err) return res.status(400).send(err);

      //We have to know if the user has already favorited this spot
      let result = false;
      if (favorite.length !== 0) {
        result = true;
      }

      res.status(200).json({ success: true, favorited: result });
    }
  );
};

module.exports = {
  favoritenumber,
  favorited,
  addtofavorites,
  removefromfavorites,
  getfavoritespots,
};
