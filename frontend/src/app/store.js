import { configureStore } from "@reduxjs/toolkit";
// You can give custom name to the reducers from a slice
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
export const store = configureStore({
  // auth is the name of the reducers and can be reffered as state.auth
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});

