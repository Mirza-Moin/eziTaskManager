import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteFeedback = createAsyncThunk('feedback/delete',async({taskId, userId})=>{
   
    const token = localStorage.getItem("token");

    const response = await axios.delete(`http://localhost:4000/api/v1/task/${taskId}/feedback/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    //   console.log('the response from the thunk',response.data)
      return response.data.updatedData
})

export {deleteFeedback}