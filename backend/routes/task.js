import express from "express";
import {
  newTask,
  getMyAdminTask,
  updateAdminTask,
  deleteAdminTask,
  getMyManagerTask,
  updateManagerTask,
  getMyUserTask,
} from "../controlers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
// import { authAdmin, authManager, authUser } from "../middlewares/accessContolList.js";
import {
  authGetAllTasks,
  authUpdateTask,
  authAdmin,
} from "../middlewares/accessContolList.js";

const router = express.Router();

router.post("/new", isAuthenticated, authAdmin, newTask);

router.get("/all", isAuthenticated, authGetAllTasks, getMyManagerTask);

router.put("/:id", isAuthenticated, authUpdateTask, updateAdminTask);

router.delete("/:id", isAuthenticated, authAdmin, deleteAdminTask);

// router.put('/:id',isAuthenticated,authManager,updateManagerTask)

// router.get('/all',isAuthenticated,authAdmin,getMyAdminTask)
// router.get('/all',isAuthenticated,authUser,getMyUserTask)
// router.route('/:id').put(updateTask).delete(deleteTask)

export default router;
