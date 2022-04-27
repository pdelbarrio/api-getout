const SpotRoutes = require("express").Router();
const { authorize } = require("../../middleware/authorize");
const {
  getAll,
  create,
  getById,
  update,
  deleteSpot,
} = require("../../controllers/spot.controller");

SpotRoutes.get("/", getAll);
SpotRoutes.get("/:id", getById);
SpotRoutes.post("/", create);
SpotRoutes.put("/:id", update);
SpotRoutes.delete("/:id", deleteSpot);

module.exports = SpotRoutes;
