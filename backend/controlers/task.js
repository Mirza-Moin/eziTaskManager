import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";

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
    let tasks = await Task.find();
    // console.log(tasks)
    res.status(200).json({
      success: true,
      tasks,
    });
  }
  if (req.user.role === "User") {
    // console.log(req.user._id);
    const objectUserId = new mongoose.Types.ObjectId(req.user._id);

    // console.log("the fetched Tasks",tasks)
    let taskWithUser;
    // taskWithUser = await Task.find({
    //   $or: [{ "feedback.user": objectUserId }, { feedback: { $size: 0 } }],
    // });
    taskWithUser = await Task.find();
    //  console.log("the task with specific user",taskWithUser)
    const tasks = taskWithUser.map((task) => {
      if (task.feedback.length !== 0) {
        let updatedFeedback = task.feedback.filter(
          (feedback) => feedback.user.toString() === req.user._id
        );
        task.feedback = updatedFeedback;
        // console.log(updatedFeedback);
        if (updatedFeedback.length !== 0) {
          task.status = updatedFeedback[0].status;
        }
      } else {
      }
      return task;
    });
    //  console.log("the returned updated data",tasks)

    res.status(200).json({
      success: true,
      tasks,
    });
  }
};

export const getUsersStatus = async (req, res, next) => {
  try {
    const status = req.query.status;
    const id = req.params.id;

    const task = await Task.findById(id);
    const feedbacks = task.feedback;
    if (status === "Feedback") {
      return res.status(200).json({
        success: true,
        message: "controller is running do your work",
        feedbacks,
        users: [],
      });
    }

    if (status === "In Progress") {
      var usersPromises = feedbacks.map(async (feedback) => {
        const userDocument = await User.findById(feedback.user, "userName");
        const userName = userDocument.userName;
        if (feedback.status === "In Progress") {
          return { userName: feedback.userName, status: feedback.status };
        }
        if (feedback.status === "Completed") {
          return { userName: null };
        }
      });
    }
    if (status === "Completed") {
      var usersPromises = feedbacks.map(async (feedback) => {
        const userDocument = await User.findById(feedback.user, "userName");
        const userName = userDocument.userName;

        if (feedback.status === "Completed") {
          return { userName, status: feedback.status };
        }
        if (feedback.status === "In Progress") {
          return { userName: null };
        }
      });
    }
    const usersArray = await Promise.all(usersPromises);
    const users = usersArray.filter((user) => user.userName !== null);

    return res.status(200).json({
      success: true,
      message: "controller is running do your work",
      users,
      feedbacks,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Bad request",
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

    const usersExist = await Task.find({
      $and: [{ "feedback.user": objectUserId }, { _id: id }],
    });
    if (usersExist.length === 0) {
      console.log("running when adding feedback");
      // task.status = status;
      task.feedback.push({
        user: req.user._id,
        userName: req.user.userName,
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
      console.log("the clicked task", task);
      console.log("updated task", updatedData);
      console.log("updated feedback", updatedData[0].feedback);

      task.set({
        title: updatedData[0].title,
        description: updatedData[0].description,
        status: updatedData[0].status,
        feedback: updatedData[0].feedback,
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

export const deleteFeedback = async (req, res) => {
  const { userId, taskId } = req.params;

  const task = await Task.findById(taskId);
  const updatedFeedback = task.feedback.filter(
    (feedback) => feedback.user.toString() !== userId
  );
  task.feedback = updatedFeedback;

  const updatedData = await task.save();
  console.log(updatedData);

  res.status(200).json({
    success: true,
    message: "Feedback Deleted Successfully",
    userId,
    updatedData,
  });
};

export const updateFeedback = async (req, res, next) => {
  const { userId, taskId } = req.params;
  const { status } = req.body;
  console.log(status);

  const task = await Task.findById(taskId);
  console.log(task);
  const updatedFeedback = task.feedback
    .map((feedback) => {
      if (feedback.user.toString() === userId) {
        feedback.description = "Feedback Updated by admin";
        feedback.status = status; // Modify status property
      }
      return feedback;
    })
    // .filter((feedback) => feedback.user.toString() === userId);
    task.feedback = updatedFeedback
    const updatedData = await task.save()
  console.log("targetted feedback", updatedFeedback);

  res.status(200).json({
    success: true,
    message: "Feedback updated Successfully",
    userId,
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
