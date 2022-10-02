const express = require("express");
const router = express.Router();
const voteController = require("../controllers/vote");

//questions
router.get("/upvote/question/:questionid/:voter", voteController.upvote);

router.get("/downvote/question/:questionid/:voter", voteController.downvote);

// answer
router.get("/upvote/answer/:questionid/:voter", voteController.upvote_Answer);

router.get(
  "/downvote/answer/:questionid/:voter",
  voteController.downvote_Answer
);

module.exports = router;
