import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateTask = createAsyncThunk('task/update',async(task)=>{
   console.log("the task inside upadater",task)
    const token = localStorage.getItem("token");

    const response = await axios.put(`http://localhost:4000/api/v1/task/${task.id}`,{task}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('the response from the thunk',response.data)
      return response.data.updatedTask
})

export {updateTask}