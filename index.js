const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");

//Routes
const UserRoutes = require("./routes/api/user.routes");
const SpotRoutes = require("./routes/api/spot.routes");

const { connectDb } = require("./helpers/db");
const { setError } = require("./helpers/utils");
const res = require("express/lib/response");

const PORT = process.env.PORT || 4000;

const app = express();

connectDb();

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Cors config default
app.use(
  cors({
    origin: (_origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(morgan("dev"));

//Routes
app.use("/api/users", UserRoutes);
app.use("/api/spots", SpotRoutes);

//Not found routes
app.use("*", (_req, _res, next) => {
  return next(setError(404, "Route not found"));
});

//Error handler
app.use((error, _req, res, _next) => {
  return res
    .status(error.code || 500)
    .json(error.message || "Unexpected error");
});

// const server = http.createServer(app);

//Open Server (Commented during tests)
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

module.exports = app;
