const express = require('express');
const router = express.Router();
const Project = require('../models/project');
// const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// uploads 폴더 생성
try {
    fs.readdirSync('uploads');
} catch(err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// multer 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});

router.use(async (req,res, next) => {
    const projects = await Project.findAll({ where: { user: req.user.id }});
    res.locals.projects = projects;
    next();
});

router.get('/', async (req, res) => {
    res.render('project/index');
});

router.get('/add', (req, res) => {
    res.render('project/addProject');
});
router.post('/add', upload.single('img'), async (req, res) => {
    const { name, description, giturl } = req.body;
    console.log(req.file);
    const project = await Project.create({
        name,
        description,
        giturl,
        img: req.file.filename,
        user: req.user.id,
    });
    res.redirect('/project');
});

module.exports = router;