import express from "express";

const router = express.Router();

router.get('/api/todos', todoController)

export default router;