/*  */
/*  */
const helper = {};

helper.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("errorMessage", "No authentication credentials");
    res.redirect("/");
  }
};

helper.isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    req.flash("errorMessage", "You have a session");
    res.redirect("/dashboard");
  }
};

module.exports = helper;
