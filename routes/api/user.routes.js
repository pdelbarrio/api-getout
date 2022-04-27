const UserRoutes = require("express").Router();
const { authorize } = require("../../middleware/authorize");
const { getUserData, getById } = require("../../controllers/user.controller");

UserRoutes.get("/", getUserData);
UserRoutes.get("/:id", getById);

module.exports = UserRoutes;
