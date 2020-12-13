const express = require("express");
const router = express.Router();

const { isAuthenticated, isNotAuthenticated } = require("../helpers/auth");
const index = require("../controllers/index.controller");

router.get("/", index.showHome);

router.get("/signin", isNotAuthenticated, index.showFormSignin);

router.get("/dashboard", isAuthenticated, index.showDashboard);

module.exports = router;
