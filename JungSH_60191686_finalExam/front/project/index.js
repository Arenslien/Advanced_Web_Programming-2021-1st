window.onload = () => {
    addProjectButton();
}

function addProjectButton() {
    document.getElementById('add_project').addEventListener('click', async (e) => {
        e.preventDefault();
        window.location.href = '/project/add';
    });
}