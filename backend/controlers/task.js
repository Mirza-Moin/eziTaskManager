import { Task } from "../models/task.js";



// ********CONTROLLERS FOR ADMIN ROLE*************
export const newTask = async (req, res, next) => {
  const { title, description, status } = req.body;

  const newTask = new Task({
    title,
    description,
    status,
  });
  await newTask.save();

  res.status(200).json({
    success: true,
    message: "Task Added Successfuly",
    newTask,
  });
};

export const getMyAdminTask = async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateAdminTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  console.log(req.body);
  const updatedData = await Task.findByIdAndUpdate(
    req.params.id,
    req.body.task,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Task Updated Successfull",
    updatedData,
  });
};

export const deleteAdminTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted Successfully",
    id,
  });
};

// **************CONTROLLERS FOR MANAGER ROLE*****************

export const getMyManagerTask = async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateManagerTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  console.log(req.body);
  const updatedData = await Task.findByIdAndUpdate(
    req.params.id,
    req.body.task,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Task Updated Successfull",
    updatedData,
  });
};

// *************CONTROLLERS FOR USER ROLE***************

export const getMyUserTask = async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).json({
    success: true,
    tasks,
  });
};