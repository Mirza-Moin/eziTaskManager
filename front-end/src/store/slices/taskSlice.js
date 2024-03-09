import { createSlice } from "@reduxjs/toolkit";

import { fetchTasks } from "../thunks/taskThunks/fetchTasks";
import { updateTask } from "../thunks/taskThunks/updateTask";
import { createTask } from "../thunks/taskThunks/createTask";
import { deleteTask } from "../thunks/taskThunks/deleteTask";
import { addFeedback } from "../thunks/feedbackThunks/addFeedback";
import { deleteFeedback } from "../thunks/feedbackThunks/deleteFeedback";
import { updateFeedback } from "../thunks/feedbackThunks/updateFeedback";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    searchTerm: "",
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    // for addTasks
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error is", action.error);
      state.error = action.error;
    });
    // for delete tasks
    builder.addCase(deleteTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log("action payload in a delete task",action.payloa)
      state.data = state.data.filter((task) => task._id !== action.payload);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // for create tasks
    builder.addCase(createTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      //console.log("action payload in a delete task",action.payloa)
      state.data.push(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // for update tasks
    builder.addCase(updateTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      //console.log("action payload in a delete task",action.payloa)
      state.data.push(action.payload);
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //for adding feedback
    builder.addCase(addFeedback.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedTask = action.payload; 
      const index = state.data.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (index !== -1) {
        state.data[index] = updatedTask;
      } else {
        state.data.push(updatedTask);
      }
    });
    builder.addCase(addFeedback.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error is slice is", action.error);
      state.error = action.error;
    });

    // for deleting feedback
    builder.addCase(deleteFeedback.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedTask = action.payload; 
      const index = state.data.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (index !== -1) {
        state.data[index] = updatedTask;
      } else {
        state.data.push(updatedTask);
      }
    });
    builder.addCase(deleteFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // for updating feedbacd

    builder.addCase(updateFeedback.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedTask = action.payload; 
      const index = state.data.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (index !== -1) {
        state.data[index] = updatedTask;
      } else {
        state.data.push(updatedTask);
      }
    });
    builder.addCase(updateFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    });
  },
});

export const taskReducer = taskSlice.reducer;
