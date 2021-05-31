const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const pug = require("pug");

const router = express.Router();
const app = express();
app.set("views", path.join(__dirname, "./public/pages"));
app.set("view engine", "pug");

// GET / 라우터
router.get("/", async (req, res) => {
    project_db = JSON.parse(await fs.readFile(path.join(__dirname, "../projects/project.json")));
    projects = [];
    for(let i in project_db.project) {
        projects.push(project_db.project[i]);
    }
    res.send(projects);
});

router.post("/", async (req, res) => {
    console.log("[성공] POST: /project");
    const { name, description, url } = req.body;

    if(name && description && url) {
        project_db = JSON.parse(await fs.readFile(path.join(__dirname, "../projects/project.json")));

        let new_project = project_db.project;
        new_project.push({ name, description, url});
        project_db.project = new_project;
        console.log(project_db.project);
        await fs.writeFile(path.join(__dirname, "../projects/project.json"), JSON.stringify(project_db));
        return res.send(true);
    }
    return res.send(false);
});

router.put("/", async (req, res) => {
    console.log("[성공] PUT: /project");
    const { name, description, url, originName} = req.body;
    edited_project = { name, description, url};
    if(name && description && url) {
        project_db = JSON.parse(await fs.readFile(path.join(__dirname, "../projects/project.json"))); 
        
        projects=project_db.project;
        for(let i=0; i<projects.length; i++) {
            if(projects[i].name == originName) {
                projects.splice(i, 1);

                projects.push(edited_project);
                project_db.project = projects;
                
                console.log(project_db);
                await fs.writeFile(path.join(__dirname, "../projects/project.json"), JSON.stringify(project_db));
                return res.send(true);
            }
        }

        await fs.writeFile(path.join(__dirname, "../projects/project.json"), JSON.stringify(project_db));
        return res.send(true);
    }
    return res.send(false);
});

router.delete("/:name", async (req, res) => {
    const name = req.params.name;

    console.log("[성공] DELETE: /project");
    project_db = JSON.parse(await fs.readFile(path.join(__dirname, "../projects/project.json")));
    projects= project_db.project;
    for(let i=0; i<projects.length; i++) {
        if(projects[i].name == name) {
            projects.splice(i, 1);

            project_db.project = projects;
            console.log(project_db);
            await fs.writeFile(path.join(__dirname, "../projects/project.json"), JSON.stringify(project_db));
            return res.send(true);
        }
    }
});



module.exports = router;