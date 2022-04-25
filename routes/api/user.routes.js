const UserRoutes = require("express").Router();

const User = require("../../models/user.model");

UserRoutes.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
});

module.exports = UserRoutes;
