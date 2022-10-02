const express = require("express");
const { router } = require("../app");
const Router = express.Router();
const QuestionController = require("../controllers/question");

// newQuestion, allquestions, questiondetail, modify;

//newQuestion
Router.get("/newquestionpage", QuestionController.newQuestionPage);
Router.post("/newQuestion", QuestionController.newQuestion);

//allquestions
Router.get("/allquestions", QuestionController.allquestions);

//questiondetail
Router.get("/questiondetail/:id/:uid", QuestionController.questiondetail);

//modify
Router.get("/modify", QuestionController.modificationPage);

//Edit
Router.get("/modify/edit/:qid", QuestionController.modificationEdit);

//delete
Router.get("/modify/delete/:id", QuestionController.modificationDelete);

//update
Router.post("/modify/update/:id", QuestionController.modificationUpdate);

module.exports = Router;
