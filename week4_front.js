async function getAnswer() {
    try {
        const res = await axios.get('./answer');
        const name = res.data;
        const answer = document.getElementById('answer');
        answer.textContent = name;
    } catch(error) {
        console.error(error);
    }
}


document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(e);
    const tech = e.target.input1.value;
    console.log(e.target.input1.value);
    if (!tech) {
        return alert('웹 기술을 입력하세요.');
    }
    try {
        await axios.post('/input1', { tech });
        getAnswer();
    } catch(error) {
        console.error(error);
    }
    e.target.webtech.value = '';
});