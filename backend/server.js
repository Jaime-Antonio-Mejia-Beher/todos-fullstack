import express from "express";
import mongoConfig from "./config.js";
import 'dotenv/config'
import Todo from "./models/ToDoModel.js";

const app = express();

const PORT = 8080

app.get('/', (req, res) => {
    res.json("Hello from server...STILL WORKING")
})

app.get('/api/todos', async(req, res) => {
    try {
        const todos = await Todo.find() //request todos form database
        res.status(200).json(todos) // send to client what we returned from database
    } catch(error) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT)
    mongoConfig() // will establish connection to database
})