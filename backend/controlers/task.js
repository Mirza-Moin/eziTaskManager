import { Task } from "../models/task.js";
import {io} from '../app.js'


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
  // console.log(req.body);
  const updatedData = await Task.findByIdAndUpdate(
    req.params.id,
    req.body.task,
    { new: true }
  );
  // io.on('connection',(socket)=>{
  //   console.log("User Connected",socket.id)
  //   // let data = 1234567
  //   socket.emit("task-update",updatedData)
  //  console.log("running inside the socket")
  //   socket.on("disconnect",()=>{
  //   console.log("User disconnected",socket.id)
  
  //   })
  // })
  res.status(200).json({
    success: true,
    message: "Task Updated Successfull",
    updatedData,
  });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted Successfully",
    id,
  });
};

