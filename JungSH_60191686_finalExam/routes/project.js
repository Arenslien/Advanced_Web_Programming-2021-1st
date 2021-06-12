const express = require('express');
const router = express.Router();
const Project = require('../models/project');
// const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch(err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

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


router.get('/', async (req, res) => {
    const projects = await Project.findAll({ where: { id: req.user.id }});
    console.log(projects);
    res.render('project/index', { projects });
});

router.get('/add', (req, res) => {
    res.render('project/addProject');
});
router.post('/add', upload.single(''), async (req, res) => {
    console.log(req.file);
    const project = await Project.create({
        name,
        description,
        giturl,
        img
    });
});

module.exports = router;