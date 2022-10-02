const usersm = require("../models/user");
const questions = require("../models/question");
const answers = require("../models/answer");
const votes = require("../models/vote");
const tag = require("../models/tag");

exports.signup = async function (req, res) {
  let displayname = req.body.displayname;

  let email = req.body.email;
  let password1 = req.body.password1;
  let password2 = req.body.password2;
  if (password1 === password2) {
    const newUser = await new usersm({
      displayname: displayname,
      email: email,
      password: password1,
      profilepic: removePublic(req.file.path),
    });
    await newUser.save((err, suc) => {
      if (err) {
        res.render("error", {
          error: err,
          message: err,
        });
      } else if (suc) {
        res.render("login");
      }
    });
  } else {
    res.send("password must be the same");
  }
};

function removePublic(string) {
  return string.slice(7);
}
