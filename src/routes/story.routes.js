const express = require("express");
const router = express.Router();
const stories = require("../controllers/story.controller");
const { isAuthenticated } = require("../helpers/auth");

router.get("/add", isAuthenticated, stories.showFormAddStory);

router.post("/add", isAuthenticated, stories.addStory);

router.get("/delete/:id", isAuthenticated, stories.deleteStory);

router.get("/edit/:id", isAuthenticated, stories.showFormEditStory);

router.post("/edit/:id", isAuthenticated, stories.editStory);

router.get("/all", isAuthenticated, stories.showAllStory);

module.exports = router;
