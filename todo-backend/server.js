const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Get tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add task
app.post("/tasks", async (req, res) => {
  await Task.create({ text: req.body.text });
  const tasks = await Task.find();
  res.json(tasks);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  const tasks = await Task.find();
  res.json(tasks);
});

app.listen(5000, () => console.log("Server running on 5000"));
