const jwt = require("jsonwebtoken");

const validationPassword = (password) => {
  const response =
    //The field must have 1 uppercase, 1 lowercase and at least 1 number
    /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;
  return response.test(String(password));
};

const validationEmail = (email) => {
  const response =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return response.test(String(email).toLocaleLowerCase());
};

const setError = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
};

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  setError,
  verifyToken,
  generateToken,
  validationEmail,
  validationPassword,
};
