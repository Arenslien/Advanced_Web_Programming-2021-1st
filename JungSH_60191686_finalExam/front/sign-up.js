//Login form에 대한 이벤트 리스너 등록
function validifyForm() {
    const name = document.getElementsByName('name')[0].value;
    const id = document.getElementsByName('id')[0].value;
    const password = document.getElementsByName('password')[0].value;
    const confirm = document.getElementsByName('confirm')[0].value;

    if (name == null || name == "") {
        alert('이름을 입력해주세요');
        return false;
    }
    if (id == null || id == "") {
        alert('ID를 입력해주세요');
        return false;
    }
    if (password == null || password == "") {
        alert('비밀번호를 입력해주세요');
        return false;
    }
    if (confirm == null || confirm == "") {
        alert('확인을 위한 비밀번호를 입력해주세요');
        return false;
    }
    if (password != confirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }
    return true;
}