import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {io} from 'socket.io-client'

const addFeedback = createAsyncThunk('feedback/added',async(feedback)=>{
  //  console.log("the task inside upadater",task)
    const token = localStorage.getItem("token");
    console.log('running')
    const response = await axios.put(`http://localhost:4000/api/v1/task/${feedback.taskId}/feedback`,{feedback}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      const socket = io("http://localhost:4000")
      socket.emit("feedback-added",response.data.feedback)
      console.log('the response from the thunk add feedback',response.data)
      return response.data.updatedData
    
   
})

export {addFeedback}