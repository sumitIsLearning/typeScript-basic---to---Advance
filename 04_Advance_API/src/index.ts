interface UserInterFace {
    id: string
    name: string
    age: number
    email: string
    password: string
}

function sumOfAge(user1: UserInterFace, user2: UserInterFace) {
    return (user1.age + user2.age);
}

const ans = sumOfAge({
    id: "1",
    name: "sumit",
    age: 21,
    email: "sumit@gmail.com",
    password: "1239090"
}, {
    id: "2",
    name: "joy",
    age: 31,
    email: "joy@gmail.com",
    password: "1248080"
});

// console.log(ans);

// pick
/* pick allows you to create a new type from an existing type by allow you to pick keys from an existing type */

type UserAge = Pick<UserInterFace, "age">;

function CalculateTotalAge(user1: UserAge, user2: UserAge) {
    return (user1.age + user2.age)
}


//usecase
type UpdateProp = Pick<UserInterFace, "name" | "age" | "email">;

function UpdateUser(updateProp: UpdateProp) {
    // hit the db and update the User
}

UpdateUser({
    name: "sumit",
    age: 21,
    email: "sumit@gmail.com"
})

// partial
/* partial makes all the properties of a type optional, creating a type with same properties, but each marked as optional  */

//usecase
type UpdateProp2 = Pick<UserInterFace, "name" | "age" | "email">;

type UpdateProp2Optional = Partial<UpdateProp2>;

function UpdateUser2(updateProp: UpdateProp2Optional) {
    // hit the db and update the User
}

UpdateUser2({
    name: "sumit",
})

// readOnly
/* Readonly lets you make internal values of object or arrays constant 
this helps when
- you don't want your obj's/ array's interval value be change*/

interface TodoInterFace {
    readonly id: number,
    title: string,
    description: string,
    completed: boolean
}

const todo1: TodoInterFace = {
    id: 1,
    title: "go to gym",
    description: "will do benchpress and pushUPs",
    completed: false
}

// now here you can change other there properties of todo obj but not the id

// todo1.id = 2; // uncomment and check for your self // and do you remember enums , it is that enums make its innervalues read only

// todo1.title = "Go To Gym"

// and you can also do this
const todo2: Readonly<TodoInterFace> = {
    id: 1,
    title: "go to gym",
    description: "will do benchpress and pushUPs",
    completed: false
} // this make your whole object readonly


// record and map
/* Record give you a cleaner type of Object */

interface Client {
    id: string,
    name: string
}

// type Clients {
//     [key:string]: Client
// }

type Clients = Record<string, Client>;// i can use record or i can define a type

const clients: Clients = {
    "ssr@e14": {
        id: "ssr@e14",
        name: "sumit"
    },
    "ssr@e15": {
        id: "ssr@e15",
        name: "joy"
    }
}

// maps are javascript specific topic and it derived from c++ , and are similar to c++ maps

const users = new Map<string , Client>(); // you can also enforce type
users.set("ssr@e14", {
    id: "ssr@e14",
    name: "sumit"
});
users.set("ssr@e15", {
    id: "ssr@e15",
    name: "joy"
});

console.log(users.get("ssr@e15"));

// exclude
/* Exclude lets you exclude certain types or member from an union type */

type EventType = "Up" | "Down" | "Left" | "Right" | "Jump"

type EventsRemain = Exclude<EventType , "Jump">;

function TodoRaki(event:EventsRemain) {
    console.log(`${event}`);
}

// TodoRaki("Jump");

// type inference in zod
// visit - https://zod.dev/?id=type-inference