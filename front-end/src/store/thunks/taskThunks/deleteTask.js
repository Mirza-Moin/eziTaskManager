import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteTask = createAsyncThunk('task/delete',async(id)=>{
   
    const token = localStorage.getItem("token");

    const response = await axios.delete(`http://localhost:4000/api/v1/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    //   console.log('the response from the thunk',response.data)
      return response.data.id
})

export {deleteTask}