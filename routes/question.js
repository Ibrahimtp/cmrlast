const express = require("express");
const Router = express.Router();
const QuestionController = require("../controllers/question");

// newQuestion, allquestions, questiondetail, modify;

//newQuestion

Router.get("/newquestionpage", QuestionController.newQuestionPage);
Router.post("/newQuestion", QuestionController.newQuestion);

//allquestions

//questiondetail

//modify

module.exports = Router;
