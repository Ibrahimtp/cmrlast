const user = require("../models/user");
const questions = require("../models/question");
const bcrypt = require("bcrypt");

exports.loginPage = async (req, res) => {
  res.render("login");
};

exports.loginWithCredentials = async (req, res) => {
  let allquestions = await questions
    .find({})
    .populate("tags")
    .populate("author")
    .populate("votes");

  let insertedmail = req.body.email;
  let insertedpassword = req.body.password;
  currentuser = await user.findOne({
    email: insertedmail,
  });

  if (currentuser) {
    bcrypt.compare(
      insertedpassword,
      await currentuser.password,
      function (err, result) {
        if (result) {
          session = req.session;
          session.userid = req.body.email;

          res.render("allQuestions", {
            allquestions,
            currentuser,
          });
        } else {
          res.render("error", {
            error: {
              error: "error",
            },
            message: "A user with that email does not exist",
          });
        }

        return;
      }
    );
  }
};
