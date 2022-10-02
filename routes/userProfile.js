var express = require("express");
var router = express.Router();
const userProfileController = require("../controllers/userprofile");

/* GET users listing. */
router.get("/:userid", userProfileController.userProfile);

module.exports = router;
