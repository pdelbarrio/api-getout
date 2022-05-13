const SpotRoutes = require("express").Router();
const { authorize } = require("../../middleware/authorize");
const {
  getAll,
  create,
  getById,
  update,
  deleteSpot,
} = require("../../controllers/spot.controller");

SpotRoutes.get("/", [authorize], getAll);
SpotRoutes.get("/:id", [authorize], getById);
SpotRoutes.post("/", [authorize], create);
SpotRoutes.put("/:id", [authorize], update);
SpotRoutes.delete("/:id", [authorize], deleteSpot);

module.exports = SpotRoutes;
