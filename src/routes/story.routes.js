const express = require("express");
const router = express.Router();
const stories = require("../controllers/story.controller");

router.get("/add", stories.showFormStory);

router.post("/add", stories.addStory);

module.exports = router;
