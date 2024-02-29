import express from "express";
import { newTask,getMyTask, updateTask, deleteTask} from "../controlers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { authAdmin, authManager, authUser } from "../middlewares/accessContolList.js";

const router = express.Router()

router.post('/new',isAuthenticated,authAdmin,newTask)
router.get('/all',isAuthenticated,authAdmin,getMyTask)
router.put('/:id',isAuthenticated,authAdmin,updateTask)
router.delete('/:id',isAuthenticated,authAdmin,deleteTask)

router.get('/all',isAuthenticated,authUser,getMyTask)

router.put('/:id',isAuthenticated,authManager,updateTask)
// router.route('/:id').put(updateTask).delete(deleteTask)


export default router