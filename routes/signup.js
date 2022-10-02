const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const signupController = require("../controllers/signup");
const usersm = require("../models/user");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}${file.originalname}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
});

router.post("/", upload.single("profilepic"), signupController.signup);

router.get("/d", async (req, res) => {
  const user = await usersm.find();

  const userv = await usersm.find();
  // const uservj = await tag.find().remove();
  // const usbervj = await votes.find().remove();
  // const usbergvj = await questions.find().remove();

  res.send(userv);
});

module.exports = router;
