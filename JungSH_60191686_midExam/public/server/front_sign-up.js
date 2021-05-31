//Login form에 대한 이벤트 리스너 등록
document.getElementById("sign_up_form").addEventListener('submit', async (element) => {
    element.preventDefault();
    
    // submit 이벤트가 발생한 form 안에 있는 id, password input 태그에 대한 입력 데이터
    const id = element.target.id.value;
    const password = element.target.password.value;
    const email = element.target.email.value;
    const confirm = element.target.confirm.value;


    try {
        // 서버로 id와 password를 보냄
        const result = await axios.post('/sign-up', {email, id, password, confirm});
        alert(result.data);
        // 서버로부터 결과를 받음
        if(result.data == "success") {
            document.getElementById('id').value = "";
            document.getElementById('password').value = "";
            document.getElementById('email').value = "";
            document.getElementById('confirm').value = "";
            location.href = "/login";
            alert("로그인을 성공했습니다!");
        }
        else if(result.data =="id_redundancy") {
            alert("중복된 아이디입니다.");
        }
        else if(result.data == "wrong_pw") {
            alert("비밀번호가 일치하지 않습니다.");
        }
        else {
            alert("빈 폼을 채워주세요.");
        }
    } catch(error) {
        console.error(error);
    }
});