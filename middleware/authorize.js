const { setError, verifyToken } = require("../helpers/utils.js");
const User = require("../models/user.model");

const authorize = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new Error();
    const tokenNoBearer = token.replace("Bearer ", "");
    const validToken = verifyToken(tokenNoBearer, process.env.JWT_SECRET);
    const user = await User.findById(validToken.id);
    req.user = user;
    next();
  } catch (error) {
    return next(setError(401, "Unauthorized"));
  }
};

module.exports = {
  authorize,
};
