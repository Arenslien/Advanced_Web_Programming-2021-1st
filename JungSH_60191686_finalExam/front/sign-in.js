function validifyForm() {
    const id = document.getElementsByName('id')[0].value;
    const password = document.getElementsByName('password')[0].value;

    if (id == null || id == "") {
        alert('ID를 입력해주세요');
        return false;
    }
    if (password == null || password == "") {
        alert('비밀번호를 입력해주세요');
        return false;
    }
    return true;
}