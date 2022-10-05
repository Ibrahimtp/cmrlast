const express = require("express");
const loginController = require("../controllers/login");

var currentuser;

const router = express.Router();

router.get("/", loginController.loginPage);

router.post("/", loginController.loginWithCredentials);

module.exports = router;
