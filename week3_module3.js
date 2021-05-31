// module import
const { odd, even } = require('./week3_module');
const checkNumber = require('./week3_module2');

function checkStringOddOrEven(str) {
    if(str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('Hello'));