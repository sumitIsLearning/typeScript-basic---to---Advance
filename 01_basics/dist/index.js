"use strict";
// let x = 1; // type inferencing
// console.log(x);
// let y:number = 10; // explicitly stating type
// console.log(y);
function greet(firstName) {
    console.log(`Hello ${firstName}`);
}
// greet("sumit");
function sum(num1, num2) {
    return (num1 + num2);
}
// console.log(sum(2 , 3));
function isAdult(age) {
    return (age > 18);
}
// console.log(isAdult(15));
// console.log(isAdult(20));
function delayedCall(fn) {
    setTimeout(fn, 1000);
}
// you give void type when you don't return anything
// delayedCall(() => {
//     console.log("called the function after one sec")
// })
let timeoutId = 0;
function logSumAfterDelay(fn, input1, input2) {
    setTimeout(() => {
        console.log(fn(input1, input2));
    }, 1000);
}
// logSumAfterDelay(sum , 2 , 3);
// **************** objects in functions ********************
function praise(user) {
    console.log(`🥳congratulations ${user.name}, you have turned ${user.age}😀now.`);
}
const user = {
    name: "sumit",
    age: 21
};
// praise(user);
/***************arrays of object in functions ******/
function logUsers(users) {
    users.map(user => console.log(`🥳congratulations ${user.name}, you have turned ${user.age}😀now.`));
}
;
const users = [
    {
        name: "Sumit",
        age: 21
    },
    {
        name: "joy",
        age: 18
    },
    {
        name: "tushar",
        age: 20
    },
];
function add(a, b) {
    // return (a as number) + (b as string) // this is type assertions for typescript only and are removed during transpilation(not recommended as it may cause confusion later)
    // optimal way is to convert the value to a explicit type
    return Number(a) + Number(b);
}
let ans = add(1, "2");
if (isNaN(ans)) {
    console.log("Invalid Input");
}
else {
    console.log(ans);
}
let teamLeaders = [
    {
        name: "shashank",
        age: 28,
        startDate: new Date("12-16-2024").toLocaleDateString("en-US"),
        department: "IT"
    }
];
// console.log(teamLeaders[0]);
