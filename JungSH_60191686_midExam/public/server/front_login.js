//Login form에 대한 이벤트 리스너 등록
document.getElementById("login_form").addEventListener('submit', async (element) => {
    element.preventDefault();
    
    // submit 이벤트가 발생한 form 안에 있는 id, password input 태그에 대한 입력 데이터
    const id = element.target.id.value;
    const password = element.target.password.value;

    try {
        // 서버로 id와 password를 보냄
        const result = await axios.post('/login', {id, password});

        // 서버로부터 결과를 받음
        if(result.data) {
            document.getElementById('id').value = "";
            document.getElementById('password').value = "";
            location.href = "/";
            alert("로그인을 성공했습니다!");
        }
        else {
            alert("로그인을 실패했습니다.");
        }
    } catch(error) {
        console.error(error);
    }
});