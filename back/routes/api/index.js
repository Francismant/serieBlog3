const router = require("express").Router();
const apiUsers = require("./users");
const apiSeries = require("./series");

router.use("/users", apiUsers);
router.use("/series", apiSeries);

module.exports = router;