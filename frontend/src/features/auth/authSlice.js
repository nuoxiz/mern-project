import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
//Get user from local storage. This is because we store the user inside the localstorage after we successfully logged in or registered.

const user = JSON.parse(localStorage.getItem("user"));

// This pertains to the user part of the authentication
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  message: "",
};
// Register user auth/register is the action name that will be displayed in Redux Dev extension in Chrome
// This register function is goin to be used in Register.jsx which only get "userData" argument passed in, thunkAPI is passed in automatically I guess??? And this function calles the register(userData) func from authService.js which take care of the HTTP request. In the backend, if we get an error when registering, the error will be passed up to this top-level register function (just like in Java) and catch by it.
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      // this function return the data sent from the server after we successfully registered and this data is set to the "user" part of our state

      return await authService.register(userData);
    } catch (error) {
      // the error message can be in multuple places, therefore we need to check if they exist
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // reject and pass the message as the payload of the action
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    // this function return the data sent from the server after we successfully registered and this data is set to the "user" part of our state
    return await authService.login(user);
  } catch (error) {
    // the error message can be in multuple places, therefore we need to check if they exist
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // reject and pass the message as the payload of the action
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  // extraReducers is an asyncThunk function
  extraReducers: (builder) => {
    // register is the name of the function
    // when register function is fulfilled, we will get data back, therefore we have a parameter call action
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; //
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});
/// reset is an action. export it so that we can call it in other files
export const { reset } = authSlice.actions;
// export this slice's reducers
export default authSlice.reducer;



