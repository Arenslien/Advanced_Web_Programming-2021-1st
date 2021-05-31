// 1. Promise 생성

const promise = new Promise((resolve, reject) => {
    console.log('파일을 읽고 있습니다...');
    setTimeout( () => {
        let read = true;
        if (read) {
            resolve('파일을 성공적으로 읽었습니다.');
        } else {
            reject(new Error('파일을 읽는데 실패했습니다.'));
        } 
    }, 2000);
});

// 2. then, catch, finally
promise
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('finally!');
    });

// 3. Promise chaining
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Carrot'), 1000);
});

fetchData
    .then(data => data + ' Cheese')
    .then(data => data + ' Cake')
    .then(data => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data + '!');
            }, 2000);
        });
    })
    .then(data => console.log(data))
    .catch(error => {
        console.log(error);
    });
