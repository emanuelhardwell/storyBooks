/*  */
/*  */

const Story = require("../models/Story");

const controller = {};

controller.showFormAddStory = (req, res) => {
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

controller.deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

controller.showFormEditStory = async (req, res) => {
  try {
    const searchStory = await Story.findOne({ _id: req.params.id }).lean();
    res.render("stories/edit", { searchStory });
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

controller.editStory = async (req, res) => {
  try {
    const { title, status, body } = req.body;
    await Story.findByIdAndUpdate(req.params.id, {
      title,
      status,
      body,
    }).lean();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    re.render("errors/500");
  }
};

controller.showAllStory = async (req, res) => {
  try {
    const allStory = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("stories/all", { allStory });
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

controller.showOneStory = async (req, res) => {
  try {
    const oneStory = await Story.findById(req.params.id)
      .populate("user")
      .lean();
    res.render("stories/show", { oneStory });
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

controller.showStoryUser = async (req, res) => {
  try {
    const allStory = await Story.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();
    res.render("stories/all", { allStory });
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

module.exports = controller;
