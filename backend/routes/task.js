import express from "express";
import {
newTask,
updateTask,
getMyTask,
deleteTask,
addFeedback,
getUsersStatus,
deleteFeedback,
updateFeedback
} from "../controlers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  authGetAllTasks,
  authUpdateTask,
  authAdmin,
  authUser
} from "../middlewares/accessContolList.js";
// import { usersInProgress } from "../../front-end/src/store/index.js";

const router = express.Router();

router.post("/new", isAuthenticated, authAdmin, newTask);

router.get("/all", isAuthenticated, authGetAllTasks, getMyTask);

router.put("/:id", isAuthenticated, authUpdateTask, updateTask);

router.delete("/:id", isAuthenticated, authAdmin, deleteTask);

router.put('/:id/feedback',isAuthenticated,authUser,addFeedback)
router.delete("/:taskId/feedback/:userId", isAuthenticated, authAdmin, deleteFeedback);
router.put("/:taskId/feedback/:userId", isAuthenticated, authUpdateTask, updateFeedback);



router.get("/:id",isAuthenticated,authAdmin,getUsersStatus);


export default router;
