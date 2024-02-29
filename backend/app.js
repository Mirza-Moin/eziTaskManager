import express from 'express'
import { config } from 'dotenv';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

export const app = express();

config({
    path: './data/config.env'
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




