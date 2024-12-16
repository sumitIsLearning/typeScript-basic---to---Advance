// let x = 1; // type inferencing

// console.log(x);


// let y:number = 10; // explicitly stating type
// console.log(y);

function greet(firstName: string) {
    console.log(`Hello ${firstName}`)
}

// greet("sumit");

function sum(num1: number, num2: number): number {
    return (num1 + num2);
}


// console.log(sum(2 , 3));

function isAdult(age: number): boolean { // return type is written after `function name(args:type):type`
    return (age > 18)
}

// console.log(isAdult(15));
// console.log(isAdult(20));


function delayedCall(fn: () => void) {
    setTimeout(fn, 1000)
}

// you give void type when you don't return anything

// delayedCall(() => {
//     console.log("called the function after one sec")
// })

let timeoutId: number = 0;
function logSumAfterDelay(fn: ((num1: number, num2: number) => number), input1: number, input2: number) {
    setTimeout(() => {
        console.log(fn(input1, input2))
    }, 1000)
}

// logSumAfterDelay(sum , 2 , 3);

// **************** objects in functions ********************
function praise(user: { name: string, age: number }): void {
    console.log(`🥳congratulations ${user.name}, you have turned ${user.age}😀now.`)
}

const user = {
    name: "sumit",
    age: 21
}
// praise(user);
/***************arrays of object in functions ******/

function logUsers(users: { name: string, age: number }[]): void {
    users.map(user => console.log(`🥳congratulations ${user.name}, you have turned ${user.age}😀now.`))
}

// how to define a interface
interface userInterface {
    name: string,
    age: number
};

// how to define a custom type
type usersType = userInterface[];


const users: usersType = [
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
]

// logUsers(users);

type addorConcatType = number | string;

function add(a: addorConcatType, b: addorConcatType) {
    // return (a as number) + (b as string) // this is type assertions for typescript only and are removed during transpilation(not recommended as it may cause confusion later)

    // optimal way is to convert the value to a explicit type
    return Number(a) + Number(b);

}

let ans = add(1 , "2")

if(isNaN(ans)) {
    console.log("Invalid Input")
} else {
    console.log(ans);
}


interface Employee {
    name: string,
    age: number,
    startDate: string
}

interface Manager {
    name: string,
    department: string
}

type TeamLead = (Employee & Manager) [];

let teamLeaders: TeamLead = [
    {
        name: "shashank",
        age: 28,
        startDate: new Date("12-16-2024").toLocaleDateString("en-US"),
        department: "IT"

    }
]

// console.log(teamLeaders[0]);