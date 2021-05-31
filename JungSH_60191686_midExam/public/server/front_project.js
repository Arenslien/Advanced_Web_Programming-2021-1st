async function showProject() {
    // 데이터 받아오기
    const res = await axios.get('/project');
    const projects = res.data;
    // 리스트 불러오기
    projectList = document.getElementById("project-list");

    for(let i=0; i < Object.keys(projects).length; i++) {
        // 프로젝트 박스 생성
        projectBox = document.createElement("div");
        projectBox.style.background = "white";
        projectBox.style.width = "300px";
        projectBox.style.height = "300px";
        projectBox.style.margin = "50px";

        projectName = document.createElement("div");
        projectName.innerHTML = "프로젝트명: " + projects[i].name;
        projectName.id = `name${i}`;
        console.log(projectName.id);


        projectDescription = document.createElement("div");
        projectDescription.innerHTML = "프로젝트 설명: " + projects[i].description;

        projectUrl = document.createElement("div");
        projectUrl.innerHTML = "깃허브 주소: " + projects[i].url;

        projectEdit = document.createElement("button");
        projectEdit.innerHTML = "수정";
        projectEdit.addEventListener("click", async (element) => {
            element.preventDefault();
            try {
                // 서버로 id와 password를 보냄
                const name = prompt("수정할 프로젝트 명을 입력해주세요.");
                const description = prompt("수정할 프로젝트 설명을 입력해주세요."); 
                const url = prompt("수정할 프로젝트 깃허브 url을 입력해주세요.");
                const originName = document.getElementById(`name${i}`).innerHTML.replace("프로젝트명: ", "");
                const result = await axios.put("/project", { name, description, url, originName});
        
                // 서버로부터 결과를 받음
                if(result.data) {
                    alert("프로젝트를 성공적으로 추가했습니다.");
                    
                    while(projectList.childElementCount != 0) {
                        projectList.removeChild(projectList.firstChild);
                    }
                    showProject();
                    return true;
                }
                else {
                    alert("프로젝트를 추가하지 못했습니다.");
                }
            } catch(error) {
                console.error(error);
            }
        });

        projectDelete = document.createElement("button");
        projectDelete.innerHTML = "삭제";
        projectDelete.addEventListener("click", async (element) => {
            element.preventDefault();
            try {
                // delete
                const name = document.getElementById(`name${i}`).innerHTML.replace("프로젝트명: ", "");
                await axios.delete('/project/' + name);
                alert("프로젝트를 성공적으로 삭제했습니다.");

                while(projectList.childElementCount != 0) {
                    projectList.removeChild(projectList.firstChild);
                }
                showProject();
                return true;
            } catch(error) {
                console.error(error);
            }
            
        });

        // 프로젝트 박스 요소 추가
        projectBox.appendChild(projectName);
        projectBox.appendChild(projectDescription);
        projectBox.appendChild(projectUrl);
        projectBox.appendChild(projectEdit);
        projectBox.appendChild(projectDelete);

        // Append Project Box to Project List
        projectList.appendChild(projectBox);
    }
}

async function addProject() {
    document.getElementById("project_form").addEventListener("submit", async (element) => {
        element.preventDefault();
        try {
            // 서버로 id와 password를 보냄
            const name = prompt("추가할 프로젝트 명을 입력해주세요.");
            const description = prompt("추가할 프로젝트 설명을 입력해주세요."); 
            const url = prompt("추가할 프로젝트 깃허브 url을 입력해주세요.");
            const result = await axios.post('/project', { name, description, url});
    
            // 서버로부터 결과를 받음
            if(result.data) {
                alert("프로젝트를 성공적으로 추가했습니다.");
            }
            else {
                alert("프로젝트를 추가하지 못했습니다.");
            }
        } catch(error) {
            console.error(error);
        }
        
        list = document.getElementById("project-list");
        while(list.childElementCount != 0) {
            list.removeChild(list.firstChild);
        }
        showProject();
    });
}


window.onload = () => {
    showProject();
    addProject();
};