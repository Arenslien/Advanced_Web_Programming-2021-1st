// Before Using Destructuring Assingment
var array = ['node_js', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];

console.log("Before Using Destructuring Assingment");
console.log(node, obj, bool);

// After Using Destructuring Assignment

const array2 = ['node_js', {}, 10, false];
const [str, obj2, ,bool2] = array2;
console.log("After Using Destructuring Assignment");
console.log(str, obj2, bool2);

// Array Destructuring Assignment
const destructuringAssignment1 = () => {
    let a, b, rest;
    [a, b] = [10, 20];
    console.log(a); // 10
    console.log(b); // 20

    [a, b, ...rest] = [10, 20, 30, 40, 50];
    console.log(a);
    console.log(b);
    console.log(rest);
};

console.log("Array Destructuring Assignment");
destructuringAssignment1();

// exchange two value
var x = 1;
var y = 2;

[x, y] = [y, x];
console.log("exchange two value");
console.log(x);
console.log(y);


// Object Destructuring Assignment
const destructuringAssignment2 = () => {
    ({a, b} = {a: 10, b: 20});
    console.log(a); // 10
    console.log(b); // 20
    
    ({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
    console.log(a);
    console.log(b);
    console.log(rest);
};

console.log("Object Destructuring Assignment");
destructuringAssignment2();

// Before Using Destructuring Assignment
// var candyMachine = {
//     status: {
//         name: 'node',
//         count: 5,
//     },
//     getCandy: function() {
//         this.status.count--;
//         return this.status.count;
//     },
// };
// var getCandy = candyMachine.getCandy;
// var count = candyMachine.status.count;

// After Using Destruturing Assignment
const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy() {
        this.status.count--;
        return status.count;
    },
};

const { getCandy, status: { count }} = candyMachine;

console.log("After Using Destruturing Assignment");
// console.log(getCandy()); this.status.count -> count is undefined
// console.log(status.count); error: staatus is not defined
