const jwt = require("jsonwebtoken");

const validationPassword = (password) => {
  const response =
    //8 caracteres minimo, una mayúscula, una minúscula, un numero, un simbolo y espacios
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/;
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

const generateToken = (id, mail) => {
  return jwt.sign({ id, mail }, process.env.JWT_SECRET, { expiresIn: "1d" });
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
