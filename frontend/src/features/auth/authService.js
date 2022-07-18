import axios from "axios";

const API_URI = "/api/users/";

// Register the user
const register = async (userData) => {
  const response = await axios.post(API_URI, userData);
  if (response.data) {
    // set an item call user with the data in response which includes the token needed
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  const response = await axios.post(API_URI + "login", userData);
  if (response.data) {
    // set an item call user with the data in response which includes the token needed
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }
};
const authService = {
  register,
  logout,
  login,
};

export default authService;
