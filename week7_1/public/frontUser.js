// 페이지 로딩 시 사용자 데이터 가져오는 함수

async function getUser() {
    try {
        // 서버에 /users GET 요청 후 해당 객체의 data 값 받아오기
        const res = await axios.get('/users');
        const users = res.data;

        // DOM 객체 list id를 가진
        const list = document.getElementById("list");
        list.innerHTML = "";

        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map( function (key) {
            // 1. 사용자 영역 & 이름 DOM 객체 생성
            const userDiv = document.createElement("div");
            const span = document.createElement("span");
            span.textContent = users[key].name + '님의 글: ' + users[key].memo;

            // 2. 사용자 수정 버튼 생성
            const editButton = document.createElement("button");
            editButton.textContent = "수정";

            // 수정 버튼에 대한 이벤트 리스너 등록
            editButton.addEventListener('click', async () => {
                const name = prompt('수정할 이름을 입력하세요');
                const memo = prompt('수정할 글을 입력하세요');
                if( !name || !memo) {
                    return alert("수정할 이름과 글을 반드시 입력하셔야 합니다.");
                }
                try {
                    await axios.put('/users/' + key, {name, memo});
                    getUser();
                } catch(error) {
                    console.error(error);
                }
            });

            // 3, 사용자 삭제 버튼 생성
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";

            // 삭제 버튼에 대한 이벤트 리스너 등록
            deleteButton.addEventListener('click', async () => {
                try {
                    // 서버에 사용자 삭제 요청 & getUser() 실행
                    await axios.delete('/users/' + key);
                    getUser();
                } catch(error) {
                    console.error(error);
                }
            });

            // 생성한 사용자 이름/수정/삭제 버튼을 DOM에 연결 & 브라우저에 출력
            userDiv.appendChild(span);
            userDiv.appendChild(editButton);
            userDiv.appendChild(deleteButton);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    } catch(error) {
        console.log(error);
    }
}

window.onload = getUser;

// 폼 제출(submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const memo = e.target.memo.value;

    if(!name || !memo) {
        return alert("이름과 메모를 입력하세요");
    }
    try {
        // 서버에 사용자 등록 요청 & getuser() 실행
        await axios.post('/user', { name, memo });
        getUser();
    } catch(error){
        console.error(error);
    }

    // 입력 폼 초기화
    e.target.name.value = "";
    e.target.memo.value = "";
});