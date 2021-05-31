document.getElementById("form").addEventListener('submit', async (element) => {
    element.preventDefault();
    const text = element.target.input1.value;
    
    if(!text) {
        alert("텍스트를 입력해주세요.");
    } else {
        try {
            await axios.post('/submit', { text });
            getAnswer();
        } catch(error) {
            console.error(error);
        }

    }
});

async function getAnswer() {
    const result = await axios.get('/answer');
    document.getElementById("answer").textContent = result.data;
}