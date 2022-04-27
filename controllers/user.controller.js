const User = require("../models/user.model");
const { setError } = require("../helpers/utils");

const getUserData = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error has ocurred" });
  }
};

// const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log(req.params);
//     console.log(req.user.id);
//     if (id != req.user.id) return next(setError(403, "Forbidden"));
//     const user = await User.findById(id);
//     if (!user) return next(setError(404, "User not found"));
//     return res.json(user);
//   } catch (error) {
//     return next(setError(500, "Failed recover user"));
//   }
// };

const getById = async (req, res, next) => {
  const { id } = req.params;
  const userFound = await User.findById(id);
  if (!userFound) return next(setError, "User not found");
  return res.json(userFound);
};

module.exports = { getUserData, getById };
