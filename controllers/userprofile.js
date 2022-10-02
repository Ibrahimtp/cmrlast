const user = require("../models/user");

exports.userProfile = async function (req, res) {
  currentuser = await user.findOne({ email: req.session.userid });

  userSearch = await user
    .findById(req.params.userid)
    .populate("answers")
    .populate("questions");

  res.render("user", { userSearch, currentuser });
};
