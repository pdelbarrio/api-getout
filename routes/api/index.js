//API ROUTES
const router = require("express").Router();

router.use("/spots", require("./spot.routes"));

module.exports = router;
