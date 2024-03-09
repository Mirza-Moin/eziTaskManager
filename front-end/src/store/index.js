import { configureStore } from "@reduxjs/toolkit";
import {
  taskReducer,
} from "./slices/taskSlice";
import { usersStatusReducer } from "./slices/usersStatusSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    usersStatus: usersStatusReducer
  },
});

export * from './thunks/feedbackThunks/addFeedback'
export * from './thunks/feedbackThunks/deleteFeedback'
export * from './thunks/feedbackThunks/updateFeedback'
export * from './thunks/taskThunks/createTask'
export * from './thunks/taskThunks/updateTask'
export * from './thunks/taskThunks/deleteTask'
export * from './thunks/taskThunks/fetchTasks'
export * from './thunks/userThunk/usersStatus'


