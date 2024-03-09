import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTasks = createAsyncThunk('tasks/fetch',async()=>{
   
    const token = localStorage.getItem("token");

    const response = await axios.get('http://localhost:4000/api/v1/task/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      // console.log('the response from the thunk',response.data.tasks)
      return response.data.tasks
})

export {fetchTasks}