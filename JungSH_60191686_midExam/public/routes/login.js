const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const pug = require("pug");

const router = express.Router();
const app = express();
app.set("views", path.join(__dirname, "./public/pages"));
app.set("view engine", "pug");

// GET / 라우터
router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    console.log("[성공] POST: /login");
    const { id, password } = req.body;

    // Cookie 생성
    res.cookie("id", id, {
        expires: new Date(Date.now() + 900000),
        signed: true,
    });

    if(id && password) {
        user_db = JSON.parse(await fs.readFile(path.join(__dirname, "../user/users.json")));
        for (let i in user_db.user) {
            if(id == user_db.user[i].id && password == user_db.user[i].password) {
                return res.send(true);
            }
        }
    }
    return res.send(false);
});

module.exports = router;