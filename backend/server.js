import express from "express";

const app = express();

const PORT = 8080

app.get('/', (req, res) => {
    res.json("Hello from server")
})

app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT)
})