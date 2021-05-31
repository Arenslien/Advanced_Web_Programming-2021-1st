const express = require("express");
const path = require("path");
const pug = require("pug");

const router = express.Router();
const app = express();
app.set("views", path.join(__dirname, "./public/pages"));
app.set("view engine", "pug");

// GET / 라우터
router.get("/", (req, res) => {
    res.render("setting");
});
router.get("/nav", (req, res) => {
    res.render("setting_nav");
});
router.get("/user-info", (req, res) => {
    res.render("setting_user-info");
});
router.get("/content", (req, res) => {
    res.render("setting_content");
});
router.get("/content", (req, res) => {
    res.render("setting_content");
});

module.exports = router;