let questions = require("../models/question");
const usersm = require("../models/user");
const tags = require("../models/tag");

// newQuestion, allquestions, questiondetail, modify;

exports.allquestions = async function (req, res) {
  session = req.session;
  if (req.session.userid) {
    currentuser = await usersm.findOne({
      email: req.session.userid,
    });
    let allquestions = await questions
      .find({})
      .populate("tags")
      .populate("author")
      .populate("votes");

    res.render("allQuestions", {
      allquestions,
      currentuser,
    });
  } else {
    res.render("login");
  }
};

exports.newQuestion = async function (req, res) {
  session = req.session;
  if (req.session.userid) {
    au = currentuser = await usersm.findOne({
      email: req.session.userid,
    });

    const newTag = await new tags({
      tagnames: req.body.tags,
    });
    await newTag.save();
    p = req.body.tags.split(" ");
    pi = [];
    await p.forEach((t) => {
      pi.push({ tag: t });
    });

    newquestion = new questions({
      author: au._id,
      questiontitle: req.body.title,
      questionbody: req.body.questionbody,
      tags: newTag._id,
      questioncode: req.body.questioncode,
      tracktag: pi,
    });
    await newquestion.save();

    addq = currentuser = await usersm.findOne({
      email: req.session.userid,
    });

    allquestions = await questions
      .find({})
      .populate("tags")
      .populate("author")
      .populate("votes")
      .sort({ votes: -1 });
    addq.questions = addq.questions.concat(newquestion._id);
    await addq.save();

    res.redirect("/");
  } else {
    res.send("you most be logged in before asking a question");
  }
};

exports.newQuestionPage = async function (req, res) {
  session = req.session;
  if (req.session.userid) {
    currentuser = await usersm.findOne({
      email: req.session.userid,
    });

    res.render("ask", {
      currentuser,
    });
  } else {
    res.render("error", {
      error: "log in error",
      message:
        "You must be logged in before you can ask a question" +
        ` <a href="/login">Log In </a>`,
    });
  }
};

exports.questiondetail = async function (req, res) {
  session = req.session;
  if (session.userid) {
    try {
      const question = await questions
        .findById(req.params.id)
        .populate("author")
        .populate("tags")
        .populate("answers")
        .populate({
          path: "answers",
          populate: {
            path: "votes",
          },
        })
        .populate({
          path: "answers",
          populate: {
            path: "author",
          },
          populate: {
            path: "comments",
            populate: {
              path: "author",
            },
          },
        })
        .populate("votes")
        .populate({
          path: "answers",
          populate: {
            path: "author",
          },
        })
        .sort({ "answers.votes": -1 });

      const currentuser = await usersm
        .findById(req.params.uid)
        .populate("questions");

      res.render("questionDetail", {
        question,
        currentuser,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.render("login");
  }
};

exports.modificationPage = async function (req, res) {
  session = req.session;
  if (req.session.userid) {
    currentuser = await usersm
      .findOne({
        email: req.session.userid,
      })
      .populate({
        path: "questions",
        populate: {
          path: "tags",
        },
      });

    let allquestions = currentuser.questions;
    res.render("modifylist", {
      allquestions,
      currentuser,
    });
  } else {
    res.render("login");
  }
};

exports.modificationEdit = async function (req, res) {
  question = await questions
    .findById(req.params.qid)
    .populate("author")
    .populate("");

  const currentuser = await usersm
    .findOne({
      email: req.session.userid,
    })
    .populate("questions");

  res.render("modifyquestion", {
    question,
    currentuser,
  });
};

exports.modificationDelete = async function (req, res) {
  h = await questions.findById(req.params.id);

  deleteTags = await tags.findById(h.tags._id).remove();

  tto = await questions
    .findOneAndDelete(
      {
        _id: req.params.id,
      },
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("sucess");
      }
    )
    .clone();

  const currentuser = await usersm
    .findOne({
      email: req.session.userid,
    })
    .populate("questions");

  question = allquestions = await questions
    .find()
    .populate("tags")
    .populate("author")
    .populate("votes")
    .sort("votes");

  res.render("allQuestions", {
    currentuser,
    question,
  });
};

exports.modificationUpdate = async function (req, res) {
  const currentuser = await usersm
    .findOne({
      email: req.session.userid,
    })
    .populate("questions");

  question = allquestions = await questions
    .find()
    .populate("tags")
    .populate("author")
    .populate("votes")
    .sort("votes");

  tuu = await questions.findByIdAndUpdate(req.params.id, {
    questiontitle: req.body.title,
    questionbody: req.body.questionbody,
  });

  res.render("allQuestions", {
    currentuser,
    question,
  });
};
