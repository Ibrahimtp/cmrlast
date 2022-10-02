var path = require("path");
const user = require("../models/user");
const questions = require("../models/question");
const h = "jjj";
const gg = path.resolve(__dirname, "..", "public");

exports.upload = function (req, res) {
  const file = `${gg}${req.params.path}`;
  res.download(file); // Set disposition and send it.
};
