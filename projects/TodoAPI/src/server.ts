import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
const todoFilePath: string = process.env.todoFile || ""; // in future this will we db link
const dummyTodoFilePath: string = process.env.dummyTodoFile || "";
let id: number = 101;

enum ResponseStatusCode {
    // 1xx: Informational
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,

    // 2xx: Success
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,

    // 3xx: Redirection
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    NOT_MODIFIED = 304,

    // 4xx: Client Errors
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,

    // 5xx: Server Errors
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}


interface TodoType {
    id: number,
    title: string,
    description: string,
    completed: boolean
}


function readData(file: string): TodoType[] {
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
}

function WriteData(file: string, data: {}): void {
    fs.writeFileSync(file, JSON.stringify(data, null, " "), 'utf-8');
}


app.use(express.json());
app.use(cors());


app.get("/todo", (req: Request, res: Response) => {
    try {
        const todos: TodoType[] = readData(dummyTodoFilePath);
        if (!todos) {
            res
                .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: "Error while retrieving data" });
        }
        res.json(todos); // Explicitly ing the response
    } catch (error: any) {
        res
            .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Unexpected error occurred", error: error.message });
    }

});


app.get("/todo/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const todos: TodoType[] = readData(dummyTodoFilePath);
        if (!todos) {
            res
                .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: "Error while retrieving data" });
        }

        const foundTodo = todos.find(todo => (todo.id === (Number(id))));

        if (!foundTodo) {
            res
                .status(ResponseStatusCode.NOT_FOUND)
                .json({ error: "Todo does not exit" });
        }

        res.json(foundTodo); // Explicitly ing the response
    } catch (error: any) {
        res
            .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Unexpected error occurred", error: error.message });
    }

})


app.post("/todo", (req: Request, res: Response) => {
    const todo = req.body;

    if (!todo) res.status(ResponseStatusCode.BAD_REQUEST).json({ Error: "request body missing" })

    try {
        const todos: TodoType[] = readData(dummyTodoFilePath);

        const newTodo: TodoType = {
            id,
            title: todo.title,
            description: todo.description,
            completed: false
        }

        WriteData(dummyTodoFilePath, [...todos, newTodo]);
        id++;
        res.status(ResponseStatusCode.OK).json({ success: "successfully added the todo" })
    } catch (error: any) {
        res
            .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Unexpected error occurred", error: error.message });
    }

})

app.put("/todo/:id", (req: Request, res: Response) => {
    const todoId = parseInt(req.params.id);
    const todo = req.body;

    if (!todoId || !todo) res.status(ResponseStatusCode.BAD_REQUEST).json({ Error: "request body and todo id is required" })

    try {
        const todos: TodoType[] = readData(dummyTodoFilePath);

        const todoIndex = todos.findIndex(todo => todo.id === todoId);

        todos[todoIndex] = { ...todos[todoIndex], title: todo.title, description: todo.description }

        WriteData(dummyTodoFilePath, todos);
        id++;
        res.status(ResponseStatusCode.OK).json({ success: "successfully added the todo" })
    } catch (error: any) {
        res
            .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Unexpected error occurred", error: error.message });
    }
})

app.delete("/todo/:id", (req: Request, res: Response) => {
    const todoId = parseInt(req.params.id);

    if (!todoId) res.status(ResponseStatusCode.BAD_REQUEST).json({ Error: " todo id is required" })

    try {
        const todos: TodoType[] = readData(dummyTodoFilePath);

        const todoIndex = todos.findIndex(todo => todo.id === todoId);

        todos.splice(todoIndex, 1);

        WriteData(dummyTodoFilePath, todos);
        id++;
        res.status(ResponseStatusCode.OK).json({ success: "successfully added the todo" })
    } catch (error: any) {
        res
            .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Unexpected error occurred", error: error.message });
    }
})

app.listen(port, () => {
    console.log(`server running on: http://localhost:${port}/`);
})
