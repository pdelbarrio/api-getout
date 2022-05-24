const SpotRoutes = require("express").Router();
const { authorize } = require("../../middleware/authorize");
const {
  getValidated,
  create,
  getById,
  update,
  deleteSpot,
} = require("../../controllers/spot.controller");

SpotRoutes.get("/", [authorize], getValidated);
SpotRoutes.get("/:id", [authorize], getById);
SpotRoutes.post("/", [authorize], create);
SpotRoutes.put("/:id", [authorize], update);
SpotRoutes.delete("/:id", [authorize], deleteSpot);

module.exports = SpotRoutes;
