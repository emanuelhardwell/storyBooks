const express = require("express");
const router = express.Router();
const stories = require("../controllers/story.controller");

router.get("/add", stories.showFormStory);

router.post("/add", stories.addStory);

router.get("/delete/:id", stories.deleteStory);

module.exports = router;
