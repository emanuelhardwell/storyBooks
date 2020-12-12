const express = require("express");
const router = express.Router();

const { isAuthenticated, isNotAuthenticated } = require("../helpers/auth");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signin",isNotAuthenticated , (req, res) => {
  res.render("signin");
});

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
