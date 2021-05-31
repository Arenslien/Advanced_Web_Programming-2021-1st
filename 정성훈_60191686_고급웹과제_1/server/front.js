//Login form에 대한 이벤트 리스너 등록
document.getElementById("login_form").addEventListener('submit', async (element) => {
    element.preventDefault();
    
    // submit 이벤트가 발생한 form 안에 있는 id, password input 태그에 대한 입력 데이터
    const id = element.target.id.value;
    const password = element.target.password.value;

    try {
        // 서버로 id와 password를 보냄
        await axios.post('/login_submit', {id, password});

        // 서버로부터 결과를 받음
        getAnswer();
    } catch(error) {
        console.error(error);
    }
});

async function getAnswer() {
    // 서버에 로그인에 대한 GET 요청
    const isLogin = await axios.get('/getLoginInfo');

    // 로그인이 성공적일 경우 메인 페이지로 이동
    if(isLogin.data == 'success') {
        document.getElementById('id').value = "";
        document.getElementById('password').value = "";
        location.href = "/";
        alert("로그인을 성공했습니다!");
    }
    else {
        alert("로그인을 실패했습니다.");
    }
}
