const FavoriteRoutes = require("express").Router();
const { authorize } = require("../../middleware/authorize");
const {
  favoritenumber,
  favorited,
  addtofavorites,
  removefromfavorites,
} = require("../../controllers/favorite.controller");

FavoriteRoutes.post("/favoritenumber", favoritenumber);
FavoriteRoutes.post("/favorited", favorited);
FavoriteRoutes.post("/addtofavorites", addtofavorites);
FavoriteRoutes.post("/removefromfavorites", removefromfavorites);

module.exports = FavoriteRoutes;
