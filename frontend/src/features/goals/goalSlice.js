import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error) {
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

// Get user goals
export const fetchGoals = createAsyncThunk(
  "goals/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.fetchGoals(token);
    } catch (error) {
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
// Delete goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (goalId, thunkAPI) => {
    try {
      // NB: the reason why we get the auth state is because in order to delete the goal, the user have to log in, so it is guarenteed that "user" field of the auth state is available at the deleting stage. Same reasoning applies for the two functions above.
      const token = thunkAPI.getState().auth.user.token;
      await goalService.deleteGoal(token, goalId);
    } catch (error) {
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

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState, // set the initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // push data to the goals [] in the state
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // push data to be "goals" slice of the state
        state.message = action.payload;
      })
      .addCase(fetchGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // push data to the goals [] in the state
        state.goals = action.payload; // NB: key code
        // state.user = null;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // push data to be "goals" slice of the state
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // push data to the goals [] in the state
        // action.payload is whatever we specified to return in the backend function that deals with delete goals
        // state.goals = action.payload; // NB: key code

        // "state" here means the goalSlice
        console.log(action.payload.id);
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // push data to be "goals" slice of the state
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
