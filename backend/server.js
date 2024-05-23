import express from "express";
import mongoConfig from "./config.js";
import 'dotenv/config'

const app = express();

const PORT = 8080

app.get('/', (req, res) => {
    res.json("Hello from server...STILL WORKING")
})

app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT)
    mongoConfig() // will establish connection to database
})