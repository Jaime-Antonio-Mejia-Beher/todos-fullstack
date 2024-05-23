import express from "express";
import mongoConfig from "./config.js";
import 'dotenv/config'
import Todo from "./models/ToDoModel.js";
import todoRoutes from './routes/todoRoutes.js'
import cors from 'cors';

const app = express();

const PORT = 8080

app.get('/', (req, res) => {
    res.json("Hello from server...STILL WORKING")
})

app.use(cors())
app.use(express.json())
app.use('/api/todos', todoRoutes)

app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT)
    mongoConfig() // will establish connection to database
})