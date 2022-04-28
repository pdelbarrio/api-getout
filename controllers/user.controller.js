const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { setError, generateToken } = require("../helpers/utils");

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
    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) return next(setError(409, "This Email already exists"));

    const userInBd = await newUser.save();
    return res.status(201).json(userInBd);
  } catch (error) {
    console.log(error);
    return next(setError(500, error.message || "Failed to create user"));
  }
};

const authenticate = async (req, res, next) => {
  try {
    const userInBd = await User.findOne({ email: req.body.email });
    if (!userInBd) return next(setError(404, "User not found"));

    if (bcrypt.compareSync(req.body.password, userInBd.password)) {
      const token = generateToken(userInBd._id, userInBd.email);
      return res.status(200).json({
        user: userInBd,
        token: token,
      });
    } else {
      return next(setError(401, "Email or password are not correct"));
    }
  } catch (error) {
    return next(setError(500, "Unexpected login error"));
  }
};

module.exports = { getUserData, getById, create, authenticate };
