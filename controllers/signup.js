const usersm = require("../models/user");
const questions = require("../models/question");
const answers = require("../models/answer");
const votes = require("../models/vote");
const tag = require("../models/tag");
const bcrypt = require("bcrypt");

exports.signup = async function (req, res) {
  let displayname = req.body.displayname;

  let email = req.body.email;
  let password1 = req.body.password1;
  let password2 = req.body.password2;
  let hashedPassword;
  if (password1 === password2) {
    bcrypt.hash(password1, 10, async function (err, hash) {
      if (err) {
        throw new Error();
      }

      const newUser = await new usersm({
        displayname: displayname,
        email: email,
        password: hash,
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
    });
  } else {
    res.send("password must be the same");
  }
};

function removePublic(string) {
  return string.slice(7);
}
