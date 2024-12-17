const i: number = 1;
// console.log(i);

function isEven(num: number): boolean {
    return (num % 2 === 0)
}

// console.log(isEven(5));

// ****** going deep with interfaces and types *****

// interfaces are used to define complex object types
// like
interface User {
    name: "sumit" | "joy",
    age: number,
    address: {
        city: string,
        country: string,
        pincode: number
    }
}

let user: User = {
    name: "sumit",
    age: 21,
    address: {
        city: "Lumding",
        country: "India",
        pincode: 783447
    }
}

// so if you explicitly define a value inside a interface property , you have to use that value to define your object

// so it is better to not explicitly define a value rather use primitive types

interface User2 {
    name: string,
    age: number,
    address: {
        city: string,
        country: string,
        pincode: number
    }
}

let user2: User2 = {
    name: "Tushar",
    age: 21,
    address: {
        city: "Lumding",
        country: "India",
        pincode: 783447
    },
}

// now you can define your object with any value 

// Q) now how can you make keys optional in your interface
interface User3 {
    name: string,
    age: number,
    address?: {
        city: string,
        country: string,
        pincode: number
    }
}

let user3: User3 = {
    name: "Tushar",
    age: 21,
}
// by using question mark(?) symbol after the property name

// Q) can you have interfaces inside interfaces

interface Address {
    city: string,
    country: string,
    pincode: number
}

interface user4 {
    name: string,
    age: number,
    address: Address
}

interface office {
    address: Address
}

// so yes you can define a interface and use it inside another inferface// , if you see your self repeating code , you can also create a interface that can have the repeated code which you can use in another interface

// ---> interfaces have special property. you can implement a interface as a class

interface Person {
    name: string,
    age: number,
    greet(phrase: string): string;
}

class Employee implements Person {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string): string {
        return (`${phrase} ${this.name}`)
    }
}

const employee = new Employee("joy", 20);
// console.log(employee.name);
// console.log(employee.age);
// console.log(employee.greet("Welcome"));

// you can have extra properties or method that is not present in the interface but you cannot miss the implementation of properties or methods that are present in interface.
class Manager implements Person {
    constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }

    greet(phrase: string): string {
        return (`${phrase} ${this.name}`)
    }

    isLegal(): boolean {
        return (this.age > 18)
    }
}

const manager = new Manager("sumit", 21);
console.log(manager.isLegal());

interface PeopleInterface {
    name: string,
    age: number,
    greet: () => string
}

let people: PeopleInterface = {
    name: "sumit",
    age: 21,
    greet: () => "HI"
}

console.log(people.greet())

// diff between abstract class vs interface
abstract class TeamLead {
    constructor(public name:string) {
        this.name = name;
    }

    abstract greet() :string;

    hello() {
        console.log(`Hello`);
    }

}

class Employee2 extends TeamLead {
    constructor(public name: string ){
        super(name);
        this.name = name
    }

    greet(): string {
        return "Hi there"
    }
}

// in abstract classes you can have a default function/method but in interface you cannot have one


// diff between type and interface

// with type you can do intersection and union
// type A = [
//     "hello"
// ]

type A = {
    name: string
}

type B  = {
    greet: string
}

type AorB = A | B; // union type (gives choice)
type AandB = A & B; // intersection type (combines)

let c: AorB = {
   name: "sumit",
   greet:"Hello" // union type allow overlap, even with extra properties, due to their permissive nature;
}

// union type of objects allow you to have either one type or you can have combined properties of types , this happen due to typescripts excess property check non strictlyness with union types of objects

let d : AandB = {
    name: "sumit",
    greet: "Hello"
}


// and with interfaces you can implement them in classes