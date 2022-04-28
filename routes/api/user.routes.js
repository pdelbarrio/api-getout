const UserRoutes = require("express").Router();
const { authorize } = require("../../middleware/authorize");
const rateLimit = require("express-rate-limit");
const {
  getUserData,
  getById,
  create,
  authenticate,
} = require("../../controllers/user.controller");

const userCreateRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5min
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

UserRoutes.get("/", [authorize], getUserData);
UserRoutes.get("/:id", [authorize], getById);
UserRoutes.post("/", [userCreateRateLimit], create);
UserRoutes.post("/login", authenticate);
//TODO LOGOUT

module.exports = UserRoutes;
