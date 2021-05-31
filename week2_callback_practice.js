// Before Using Asynchronous callback

console.log('START!');

function loginUser(id, password) {
    setTimeout(() => {
        console.log('사용자 정보를 얻었습니다!');
        return { userID: id, userPW: password };
    }, 3000);
}

const user = loginUser('정성훈', 123456);
console.log(`${user}님 환영합니다.`);

console.log('Finish');

// Asynchronous callback

console.log('START!');

function loginUser2(id, password, callback) {
    setTimeout(() => {
        console.log('사용자 정보를 얻었습니다!');
        callback( { userID: id, userPW: password} );
    }, 4000);
}

loginUser2('정성훈', 123456, user => {
    console.log(`${user.userID}님 환영합니다.`);
});


// Callback practice
function myCallBack(name, age, callback) {
    setTimeout(() => {
        callback( {name, age} );
    }, 5000);
}

myCallBack('정성훈', '22', (info) => {
    console.log(`제 이름은 ${info.name}이고 나이는 ${info.age}살 입니다.`);
});

