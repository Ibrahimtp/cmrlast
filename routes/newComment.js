const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment");

router.get("/:answerid", CommentController.commentPage);

router.post("/:answerid/:owner", CommentController.newComment);

module.exports = router;
