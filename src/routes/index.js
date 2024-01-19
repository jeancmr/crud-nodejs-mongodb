const express = require("express");

const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  // console.log(tasks);
  // res.send("hello world");
  res.render("index", {
    tasks, //tasks:tasks
  });
});

router.post("/add", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  // res.send("received");
  res.redirect("/"); //Ruta inicial del servidor
});

router.get("/turn/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  // console.log(task);
  task.status = !task.status;
  await task.save();
  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render("edit", {
    task,
  });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  await Task.updateOne({ _id: id }, req.body);
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  // const tsk = await Task.remove({ _id: id });
  await Task.findOneAndDelete({ _id: id });
  // console.log(tsk);
  res.redirect("/");
});

module.exports = router;
