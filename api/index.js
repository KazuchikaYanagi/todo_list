const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 4001;
const Todo = require("./models/Todo");

// Execute express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const connectionString = process.env.MONGO_URI;
mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to the database..."))
  .catch((err) => console.error("Connection error:", err));

// Routes
app.get("/todo", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", async (req, res) => {
  const newTask = await Todo.create(req.body);
  res.status(201).json({ newTask });
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
