type num = string | number;
 
let even:num = 2 ;

even = "1";
console.log(even);

// typescript union type of object has some problem or bug 
// it lets you combine two type or u can use properties of one type
type GoodUser = {
    name: string,
    giftCard: string
}

type BadUser = {
    name: string,
    ip:string
}

// type User = GoodUser | BadUser;

// let user1:User = {
//     name: "sumit",
//     giftCard: "ajyu1075jhkaf",
//     ip:"127.0.0.1"
// }

// and as for intersection you have to have all the properties of both the type


/* Assignment:
- create two types called User and Admin,
- create a function that takes either a User or an Admin as an input, and returns a string saying "welcome", [name] */

interface User {
    name:string,
    age:number
}

interface Admin {
    name: string,
    permissions: string
}

type UserOrAdmin = User | Admin;

function greet(person:UserOrAdmin) {
    console.log(`Welcome ${person.name}`)
}

let user1:User = {
    name:"sumit",
    age: 21
}

let admin1:Admin = {
    name:"Joy",
    permissions:"Manager"
}

let user2 = {
    name: "Tushar",
    permissions:"no permissions"
}

// greet(user2);

// Enums
/* Enums (short for enumerations) is a feature of typescript that allows you to define set of named constants.
The concept behind Enums is to create set of constant that are human-memorizable which might otherwise be number or string */

// usecase Game
// let suppose you are building a game in which you need to monitor the direction using the keywords up , down , left or right
// what will be the best way to do it , is it number or string , no best way is enums
// enum Direction {
//     Up,
//     Down,
//     Left,
//     Right,
//     Jump
// } // enums value are mapped 0 , 1 , 2.... (if you don't specify them explicitly)

// you can give specific value to each constant , like number 

// enum Direction {
//     Up = 20,
//     Down, // now any value below Up will start from 21 and will go on 22 , 23 ....
//     Left,
//     Right,
//     Jump
// }

// you can also give value to every constants
// enum Direction {
//     Up = 20,
//     Down = 33, 
//     Left = 10,
//     Right = 100,
//     Jump = 999,
//     Catch
// }

//but can we give string

enum Direction {
    Up = "Up",
    Down = "Down", 
    Left = "Left" ,
    Right = "Right" ,
    Jump = "Jump" ,
    Catch = "Catch"
} // ans is Yes we can but you to initialize every constant in the enum , with some value

// enum without explicitly defined number example
// function moveCharacter(keyPressed: Direction) {
//     switch (keyPressed) {
//         case 0:
//             console.log("character moved up")
//             break;
//         case 1:
//             console.log("character moved down")
//             break;
//         case 2:
//             console.log("character moved left")
//             break;
//         case 3:
//             console.log("character moved right")
//             break;
//         default:
//             console.log("Game Over")
//             break;
//     }
// }

// enum with explicitly defined number
// function moveCharacter(keyPressed: Direction) {
//     switch (keyPressed) {
//         case 20:
//             console.log("character moved up")
//             break;
//         case 33:
//             console.log("character moved down")
//             break;
//         case 10:
//             console.log("character moved left")
//             break;
//         case 100:
//             console.log("character moved right")
//             break;
//         default:
//             console.log("Game Over")
//             break;
//     }
// }


// so by not following the above function , we can make our function more dynamic by doing this
function moveCharacter(keyPressed: Direction) {
    switch (keyPressed) {
        case Direction.Up:
            console.log("character moved up")
            break;
        case Direction.Down:
            console.log("character moved down")
            break;
        case Direction.Left:
            console.log("character moved left")
            break;
        case Direction.Right:
            console.log("character moved right")
            break;
        default:
            console.log("Game Over")
            break;
    }
} // using directly the enum to check the key/value of the enum constant 

// moveCharacter(Direction.Up);
// moveCharacter(Direction.Right);
// moveCharacter(Direction.Up);
// moveCharacter(Direction.Left);
// moveCharacter(Direction.Up);
// moveCharacter(Direction.Right);
// moveCharacter(Direction.Down);
// moveCharacter(Direction.Jump);


// console.log(Direction.Catch);

// common use case in express
enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
} // is to create a enum that will hold on the ResponseStatus that we can use without remembering the Status code
// we can just do this 

//try this in an express app
// app.get("/', (req, res) => {
//     if (!req.query.userId) {
// 			res.status(ResponseStatus.Error).json({})
//     }
//     // and so on...
// 		res.status(ResponseStatus.Success).json({});
// })
// ResponseStatus.Error // this are read-only values , you cannot change them



//Generics
/* . Problem Statement
Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.
How would you solve this problem? */

// type NumberOrString = number | string;

// function firstElement(arr:NumberOrString []) {
//     return arr[0];
// } 

// let ans = (firstElement([2 , "3" , 4 , 5]));

// console.log(ans.toLoweCase()) //the property 'toLoweCase' does not exist on type 'NumberOrString'.

// typescript isn't able to infer the right type of the return type


// solution : Generics <T> , <Type>, you can give any name to this <name>

function firstElement<Type>(arr:Type[]) {
    return arr[0];
}

let ans = (firstElement<string>(["2", "3" , "4" , "5"]));
console.log(ans.toLowerCase());

/* Generic in typescript allow you to write reusable type-safe code , you create component like function , classes or interfaces  that can take variety of types while maintaining the type safety

Why Use Generics?
Generics are useful when:

- The type isn't known until runtime but you want to enforce type safety.
- You want to avoid duplicating code for different types.
- You need flexibility without compromising on type correctness.

*/

// you can extend a generic by doing this
interface Manager<Type extends string | number> {
    name:Type,
    age:Type,
    department:Type
}

let sumit:Manager<string> = {
    name:"sumit",
    age:"21",
    department:"IT"
}
