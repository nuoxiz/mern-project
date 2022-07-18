import axios from "axios";

const API_URL = "/api/goals/";

//Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

const fetchGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};
const deleteGoal = async (token, goalId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(goalId);
  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};
const goalService = { createGoal, fetchGoals, deleteGoal };

export default goalService;
