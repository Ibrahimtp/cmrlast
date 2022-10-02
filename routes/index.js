var express = require("express");
var router = express.Router();
const user = require("../models/user");
const questions = require("../models/question");
const QuestionController = require("../controllers/question");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let allquestions = await questions
    .find({})
    .populate("tags")
    .populate("author")
    .populate("votes");

  currentuser = await user.findOne({
    email: req.session.userid,
  });

  if (req.session.userid) {
    res.render("allQuestions", {
      allquestions: allquestions.reverse(),
      currentuser,
    });
  } else {
    res.render("index");
  }
});

module.exports = router;
