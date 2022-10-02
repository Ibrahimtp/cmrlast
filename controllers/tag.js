const user = require("../models/user");
const tags = require("../models/tag");
const questions = require("../models/question");

exports.tagPage = async function (req, res) {
  const tag = await tags.find();

  currentuser = await user.findOne({ email: req.session.userid });
  t = [];

  tgg = await tag.forEach((n) => {
    t.push(n.tagnames[0].split(" "));
  });

  hyy = [];
  await t.forEach((h) => {
    h.forEach((h) => {
      hyy.push(h);
    });
  });

  var unique = hyy.filter(onlyUnique);

  res.render("tags", { unique, currentuser });
};

exports.tagRelatedQuestions = async function (req, res) {
  const tagrefered = await questions
    .find()
    .elemMatch("tracktag", {
      tag: req.params.tag,
    })
    .populate("tags")
    .populate("author");

  var allquestions = tagrefered;
  currentuser = await user.findOne({ email: req.session.userid });
  res.render("allQuestions", { allquestions, currentuser });
  // res.send(tagrefered)
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
