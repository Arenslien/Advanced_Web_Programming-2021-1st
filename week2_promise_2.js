function loginUser(id, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('사용자 정보를 얻었습니다.');
            resolve( {id, password} );
        }, 3000);
    });
}

function getUserVideos(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['video1', 'video2', 'video3']);
        }, 2000);
    });
}

function videoDetails(video) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${video}의 제목은 ... 입니다.`);
        }, 2000);
    });
}

loginUser('admin', '123456')
    .then(user => {
        console.log(`${user.id}님 환영합니다.`);
        return getUserVideos(user.id);
    })
    .then(videos => {
        console.log(videos);
        return videoDetails(videos[0]);
    })
    .then(details => console.log(details));


const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

Promise.all([promise1, promise2])
    .then(result => {
        setTimeout(() => {
            console.log(result);
        }, 8000);
    })
    .catch(error => {
        console.log(error);
    });