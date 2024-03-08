import express from "express";
import {
newTask,
updateTask,
getMyTask,
deleteTask,
addFeedback
} from "../controlers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  authGetAllTasks,
  authUpdateTask,
  authAdmin,
  authUser
} from "../middlewares/accessContolList.js";

const router = express.Router();

router.post("/new", isAuthenticated, authAdmin, newTask);

router.get("/all", isAuthenticated, authGetAllTasks, getMyTask);

router.put("/:id", isAuthenticated, authUpdateTask, updateTask);

router.delete("/:id", isAuthenticated, authAdmin, deleteTask);

router.put('/:id/feedback',isAuthenticated,authUser,addFeedback)


export default router;
