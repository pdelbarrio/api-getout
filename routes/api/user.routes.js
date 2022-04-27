const UserRoutes = require("express").Router();
const { authorize } = require("../../middleware/authorize");
const {
  getUserData,
  getById,
  create,
} = require("../../controllers/user.controller");

UserRoutes.get("/", getUserData);
UserRoutes.get("/:id", getById);
UserRoutes.post("/", create);
//TODO LOGIN
//TODO LOGOUT

module.exports = UserRoutes;
