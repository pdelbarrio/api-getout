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

const getById = async (req, res, next) => {
  const { id } = req.params;
  const userFound = await User.findById(id);
  if (!userFound) return next(setError, "User not found");
  return res.json(userFound);
};

const create = async (req, res, next) => {
  try {
    const newUser = await new User(req.body);
    console.log("NEW USER IN CONTROLLER", newUser);
    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) return next(setError(409, "This Email already exists"));

    const userInBd = await newUser.save();
    return res.status(201).json(userInBd);
    // const newUser = await User.create(req.body);
    // return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return next(setError(500, error.message || "Failed to create user"));
  }
};

// const create = async (req, res, next) => {

//   try {
//     const newUser = await User.create(req.body);
//     return res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: "An error has ocurred" });
//   }
// };

module.exports = { getUserData, getById, create };
