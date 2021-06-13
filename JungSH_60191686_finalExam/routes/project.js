// Import Modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import Model
const Project = require('../models/project');

// Generate uploads folder
try {
    fs.readdirSync('uploads');
} catch(err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// multer setting
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

// Router setting
router.use(async (req,res, next) => {
    const projects = await Project.findAll({ where: { user: req.user.id }});
    res.locals.projects = projects;
    next();
});

// Router about project Index
router.get('/', async (req, res) => {
    res.render('project/index');
});

// Router about addProject.html
router.get('/add', (req, res) => {
    res.render('project/addProject');
});
router.post('/add', upload.single('img'), async (req, res) => {
    const { name, description, giturl } = req.body;
    const project = await Project.create({
        name,
        description,
        giturl,
        img: req.file.filename,
        user: req.user.id,
    });
    res.redirect('/project');
});

// Router about editProject.html
router.get('/edit', async (req, res) => {
    const { id } = req.query;
    const project = await Project.findOne({
        where: { id }
    });
    res.render('project/editProject', {project});
});
router.post('/edit', upload.single('img'), async (req, res) => {
    const { name, description, giturl, id } = req.body;
    const file = req.file;
    if(file) {
        Project.update({
            name,
            description,
            giturl,
            img: file.filename,
        }, {
            where: { id }
        });
    } else {
        Project.update({
            name,
            description,
            giturl,
        }, {
            where: { id }
        });
    }
    res.redirect('/project');
});

// Router about removing project
router.post('/remove', async (req, res) => {
    const { id } = req.body;
    Project.destroy({
        where: { id }
    });
    res.redirect('/project');
});

module.exports = router;