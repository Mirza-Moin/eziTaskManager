import { configureStore } from "@reduxjs/toolkit";
import {
  taskReducer,
} from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export * from './thunks/fetchTasks'
export * from './thunks/deleteTask'
export * from './thunks/createTask'