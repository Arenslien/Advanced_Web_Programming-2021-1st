const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const pug = require("pug");
const fs = require("fs").promises;

const app = express();
app.set("port", 3000);
app.set("views", path.join(__dirname, "public/pages"));
app.set("view engine", "pug");


//
const checkUploadFloder = async () => {
    try {
        await fs.readdir("uploads");
    } catch(error) {
        console.error("uploads 폴더 생성");
        fs.mkdir('uploads');
    }
};
checkUploadFloder();

// const upload = multer( { dest: 'uploads/'} );
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5*1024*1024 }
});

app.get("/", (req, res) => {
    res.render('index', {title:"Title"});
});

// app.post("/upload", upload.single("image"), (req, res) => {
//     console.log(req.file, req.body);
//     res.send("UPLOADED!!");
// });

// app.post("/upload", upload.array("image"), (req,res) => {
//     console.log(req.files, req.body);
//     res.send("UPLOADED!!");
// });

app.post("/upload", upload.fields([
    {name: 'image1'},
    {name: 'image2'},
    {name: 'image3'},
]), (req,res) => {
    console.log(req.files.image1);
    console.log(req.files.image2);
    console.log(req.files.image3);
    res.send("UPLOADED!!");
});


app.listen(app.get("port"), () => {
    console.log("START SERVER");
});