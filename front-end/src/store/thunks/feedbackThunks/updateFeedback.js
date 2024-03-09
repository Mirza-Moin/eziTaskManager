import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {io} from 'socket.io-client'

const updateFeedback = createAsyncThunk('feedback/update',async({taskId,userId,status})=>{
  //  console.log("the task inside upadater",task)
    const token = localStorage.getItem("token");

    const response = await axios.put(`http://localhost:4000/api/v1/task/${taskId}/feedback/${userId}`,{status}, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // const socket = io("http://localhost:4000")
      // socket.emit("task-updated",response.data.updatedData)
      // socket.emit("feedback-updated",response.data.updatedData)
      // console.log('the response from the thunk',response.data)
      return response.data.updatedData
})

export {updateFeedback}