import express from 'express'
import { config } from 'dotenv';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { isAuthenticated } from './middlewares/auth.js';
import { authUpdateTask } from './middlewares/accessContolList.js';
// import { updateAdminTask } from './controlers/task.js';
import { Task } from './models/task.js';

import { Server } from 'socket.io';
import {createServer} from 'http'

config({
    path: './data/config.env'
})

const app = express();
export const server = createServer(app)

export const io = new Server(server,{
  cors:{
    origin: 'http://localhost:3000',
    methods: ["GET","POST"],
    credentials: true
  }
})

// app.get('/',(req,res)=>{
//   res.send('hello world')
// })

// app.put('/api/v1/task/:id',isAuthenticated, authUpdateTask,async (req, res, next) => {
//   const { id } = req.params;
//   // const { title, description, status } = req.body;
//   console.log(req.body);
//   const updatedData = await Task.findByIdAndUpdate(
//     req.params.id,
//     req.body.task,
//     { new: true }
//   );

//   io.on('connection',(socket)=>{
//     console.log("User Connected",socket.id)
//     // let data = 1234567
//     socket.emit("task-update",updatedData)
  
//     socket.on("disconnect",()=>{
//     console.log("User disconnected",socket.id)
  
//     })
//   })

//   res.status(200).json({
//     success: true,
//     message: "Task Updated Successfull",
//     updatedData,
//   });
// } )


io.on('connection',(socket)=>{
  console.log("User Connected",socket.id)
  
  socket.on("task-updated",data=>{
    // console.log("the new task is",data)
    socket.broadcast.emit("task-updated",data)
  })
  socket.on("feedback-added",data=>{
    // console.log("the new task is",data)
    socket.broadcast.emit("feedback-added",data)
  })

  socket.on("disconnect",()=>{
  console.log("User disconnected",socket.id)
  })
})





//using all middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())


// app.use(cors());


//using routers
app.use('/api/v1/users',userRouter)
app.use('/api/v1/task',taskRouter)




