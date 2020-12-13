/*  */
/*  */

const Story = require("../models/Story");

const controller = {};

controller.showFormStory = (req, res) => {
  res.render("stories/add");
};

controller.addStory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

module.exports = controller;
