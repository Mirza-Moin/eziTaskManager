import mongoose from "mongoose";
import { ObjectId } from "mongoose";
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

export const getMyTask = async (req, res, next) => {
  if (req.user.role === "Admin") {
    console.log("task fetch by admin");
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      tasks,
    });
  }
  if (req.user.role === "User") {
    // console.log(req.user._id);
    const objectUserId = new mongoose.Types.ObjectId(req.user._id);
    const tasks = await Task.find();
    let taskWithUser;
    taskWithUser = await Task.find({
      $or: [{ "feedback.user": objectUserId }, { feedback: { $size: 0 } }],
    });
    // taskWithUser = await Task.find({'feedback': { $size: 0 } })
    // taskWithUser = await Task.find({'feedback.user': objectUserId })

    // console.log(taskWithUser);

    res.status(200).json({
      success: true,
      tasks,
    });
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
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

export const addFeedback = async (req, res) => {
  const { id } = req.params;
  const { status, description } = req.body.feedback;
  const objectUserId = new mongoose.Types.ObjectId(req.user._id);
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // task.feedback = [];
    // const usersExist = await Task.find({ "feedback.user": objectUserId });
   const usersExist = await Task.find({
      $and: [{ "feedback.user": objectUserId }, { _id:  id }],
    });
    // console.log()
    if (usersExist.length === 0) {
      task.status = status;
      task.feedback.push({
        user: req.user._id,
        description: description,
        status: status,
      });
      let updatedData = await task.save();
      return res.status(200).json({
        success: true,
        message: "feedback added successfully",
        updatedData,
        feedback: {
          user: req.user._id,
          description,
          status,
        },
      });
    } else {
      let updatedData = usersExist.map((task) => {
       
        if (task.feedback && task.feedback.length > 0) {
          task.feedback.forEach((feedback) => {
            if (feedback.user.toString() === req.user._id) {
              feedback.status = status;
              feedback.description = description;
            }
          });
        }
        return task; // Return the updated task
      });
      console.log("the clicked task",task)
      console.log("updated task",updatedData)
      console.log("updated feedback",updatedData[0].feedback)
      
      task.set({
        title: updatedData[0].title,
        description:updatedData[0].description,
        status: updatedData[0].status,
        feedback: updatedData[0].feedback
      }); // Set updated data
      task 
        .save()
        .then((updatedDoc) => {
          console.log("Updated Task:", updatedDoc);
          return res.status(200).json({
            success: true,
            message: "feedback added successfully",
            updatedData: updatedData[0],
            feedback: {
              user: req.user._id,
              description,
              status,
            },
          });
        })
        .catch((error) => {
          console.error("Error updating task:", error);
          return res.status(500).json({ message: "server error" });
          // Handle error
        });

    
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
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
