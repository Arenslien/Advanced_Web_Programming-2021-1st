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
    res.render("sign-up");
});

router.post("/", async (req, res) => {
    console.log("[성공] POST: /sign-up");
    const { email, id, password, confirm } = req.body;
    console.log("hey", email, id, password, confirm);
    if(email && id && password && confirm) {
        user_db = JSON.parse(await fs.readFile(path.join(__dirname, "../user/users.json")));
        // id 확인
        for(let i in user_db.user) {
            if(user_db.user[i].id == id) {
                console.log(user_db.user[i]);
                console.log(id);
                return res.send("id_redundancy");
            }
        }

        // 비밀번호 확인
        if(password != confirm) {
            return res.send("wrong_pw");
        }

        // 새로운 id 추가
        let new_user = user_db.user;
        new_user.push({ "e-mail":email , id, password});
        user_db.user = new_user;
        await fs.writeFile(path.join(__dirname, "../user/users.json"), JSON.stringify(user_db));
        return res.send("success");
    }
    else {
        return res.send("failed");
    }
});

module.exports = router;