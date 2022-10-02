const uploadController = require("../controllers/upload");
var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send(gg);
});

router.get("/:path", uploadController.upload);

module.exports = router;
