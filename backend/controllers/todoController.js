// interaction with database goes here
// import { getTodos } from "mongoose"
import Todo from "../models/ToDoModel"

const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find() //request todos form database
        res.status(200).json(todos) // send to client what we returned from database
    } catch(error) {
        console.log(err.message)
        res.status(400).json(err)
    }
}

export default {
    getTodos
}