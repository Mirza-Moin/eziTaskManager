import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const createTask = createAsyncThunk('create/delete',async(task)=>{
   
    const token = localStorage.getItem("token");

    const response = await axios.post(`http://localhost:4000/api/v1/task/new`,task, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('the response from the thunk',response.data.newTask)
      return response.data.newTask
})

export {createTask}