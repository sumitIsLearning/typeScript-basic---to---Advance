require('dotenv').config()
import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 4000;
const todoFilePath = process.env.todoFile || "../utils/todo.json" // in future this will we db link
let id = 101;

export enum ResponseStatusCode {
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


function readData(file: string):TodoType[] {
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
}

function WriteData(file: string, data: {}): void {
    fs.writeFileSync(file, JSON.stringify(data, null, " "), 'utf-8');
}


app.get("/todo", (req:any, res:any) => {
    try {
        const todos:TodoType[] = readData(todoFilePath);
        if (!todos) { 
            return res
                .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: "Error while retrieving data" });
        }
        return res.json(todos); // Explicitly returning the response
    } catch (error:any) {
        return res
            .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Unexpected error occurred", error: error.message });
    }
});


app.get("/todo/:id", (req:any, res:any) => {
    try {
        const id = req.params.id;
        const todos:TodoType[] = readData(todoFilePath);
        if (!todos) { 
            return res
                .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: "Error while retrieving data" });
        }

        const foundTodo = todos.find(todo => (todo.id === (Number(id))));

        if (!foundTodo) { 
            return res
                .status(ResponseStatusCode.NOT_FOUND)
                .json({ error: "Todo does not exit" });
        }

        return res.json(foundTodo); // Explicitly returning the response
    } catch (error:any) {
        return res
            .status(ResponseStatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Unexpected error occurred", error: error.message });
    }
    
})


app.post("/todo", (req, res) => {

})


app.put("/todo", (req, res) => {

})

app.delete("/todo", (req, res) => {

})

app.listen(port , () => {
    console.log(`server running on: http://localhost:${port}/`);
})
