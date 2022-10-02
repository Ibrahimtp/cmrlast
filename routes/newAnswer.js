const express = require("express");
const multer = require("multer");
const path = require("path");

const AnswerController = require("../controllers/answer");

const router = express.Router();

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
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "text/html" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "text/javascript" ||
      file.mimetype == "text/css" ||
      file.mimetype == "text/plain" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .png, .jpg and .jpeg .css .html .js  format allowed!")
      );
    }
  },
});

var upload = multer({
  storage: storage,
});

router.post(
  "/:answerOwner/:questionAns",
  upload.array("answerfile"),
  AnswerController.newAnswer
);

module.exports = router;
