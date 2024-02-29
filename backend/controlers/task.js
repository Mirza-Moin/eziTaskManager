import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  console.log("is runnig above");
  const { title, description, status } = req.body;
  console.log(req.user)
  await Task.create({
    title,
    description,
    status,
  });
  console.log("is running");
  res.status(200).json({
    success: true,
    message: "Task Added Successfuly",
  });
};

export const getMyTask = async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await Task.findById(id);
  if (title) {
    task.title = title;
  }
  if (description) {
    task.description = description;
  }
  if (status) {
    task.status = status;
  }

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task Updated Successfull",
  });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted Successfully",
  });
};
