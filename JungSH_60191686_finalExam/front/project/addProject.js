function validifyForm() {
    const name = document.getElementsByName('name')[0].value;
    const description = document.getElementsByName('description')[0].value;
    const url = document.getElementsByName('giturl')[0].value;
    const file = document.getElementById("file").value;

    if (name == null || name == "") {
        alert('프로젝트명을 입력해주세요');
        return false;
    }
    if (description == null || description == "") {
        alert('프로젝트 설명을 입력해주세요');
        return false;
    }
    if (url == null || url == "") {
        alert('깃허브 주소를 입력해주세요');
        return false;
    }
    if (!file){
        alert("프로젝트 이미지를 첨부해 주세요");
        return false;
    }
    return true;
}