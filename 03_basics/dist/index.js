"use strict";
let even = 2;
even = "1";
console.log(even);
function greet(person) {
    console.log(`Welcome ${person.name}`);
}
let user1 = {
    name: "sumit",
    age: 21
};
let admin1 = {
    name: "Joy",
    permissions: "Manager"
};
let user2 = {
    name: "Tushar",
    permissions: "no permissions"
};
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
var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Down"] = "Down";
    Direction["Left"] = "Left";
    Direction["Right"] = "Right";
    Direction["Jump"] = "Jump";
    Direction["Catch"] = "Catch";
})(Direction || (Direction = {})); // ans is Yes we can but you to initialize every constant in the enum , with some value
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
function moveCharacter(keyPressed) {
    switch (keyPressed) {
        case Direction.Up:
            console.log("character moved up");
            break;
        case Direction.Down:
            console.log("character moved down");
            break;
        case Direction.Left:
            console.log("character moved left");
            break;
        case Direction.Right:
            console.log("character moved right");
            break;
        default:
            console.log("Game Over");
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
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["Success"] = 200] = "Success";
    ResponseStatus[ResponseStatus["NotFound"] = 404] = "NotFound";
    ResponseStatus[ResponseStatus["Error"] = 500] = "Error";
})(ResponseStatus || (ResponseStatus = {})); // is to create a enum that will hold on the ResponseStatus that we can use without remembering the Status code
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
function firstElement(arr) {
    return arr[0];
}
console.log(firstElement([2, 3, 4, 5]));
console.log(firstElement(["20", "30", "40", "50"]));
