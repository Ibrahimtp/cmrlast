const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag");

router.get("/", tagController.tagPage);

router.get("/:tag", tagController.tagRelatedQuestions);

module.exports = router;
