/*  */
/*  */

const Story = require("../models/Story");

const controller = {};

controller.showFormAddStory = (req, res) => {
  res.render("stories/add");
};

controller.addStory = async (req, res) => {
  const { title, body } = req.body;
  let errors = [];
  if (!title) {
    errors.push({ text: "Title is required" });
  }
  if (!body) {
    errors.push({ text: "Description is required" });
  }
  if (errors.length > 0) {
    res.render("stories/add", { errors, title, body });
  } else {
    try {
      req.body.user = req.user.id;
      await Story.create(req.body);
      req.flash("successMessage", "Story added successfully");
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
      res.render("errors/500");
    }
  }
};

controller.deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    req.flash("successMessage", "Story deleted successfully");
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
  const { title, body } = req.body;
  let errors = [];
  if (!title) {
    errors.push({ text: "Title in update is required" });
  }
  if (!body) {
    errors.push({ text: "Description in update is required" });
  }
  if (errors.length > 0) {
    req.flash("errorMessage", "Story not updated because vat blank");
    res.redirect("/dashboard");
  } else {
    try {
      const { title, status, body } = req.body;
      await Story.findByIdAndUpdate(req.params.id, {
        title,
        status,
        body,
      }).lean();
      req.flash("successMessage", "Story edited successfully");
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
      re.render("errors/500");
    }
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
