import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const usersStatus = createAsyncThunk("status/users", async ({taskId,status}) => {
  const token = localStorage.getItem("token");
  
  const url = `http://localhost:4000/api/v1/task/${
    taskId
  }?status=${encodeURIComponent(status)}`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // console.log('the response from the thunk',response.data.tasks)
  return response.data;
});

export { usersStatus };
