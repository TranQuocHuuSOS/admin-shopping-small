import axios from "axios";
const API_URL = "http://localhost:5000";
export const registerUser = async (
  fullname: string,
  email: string,
  role: "user" | "admin",
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      fullname,
      email,
      role,
      password
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {
      email
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgotPassword`, {
      email
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/getUsers`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
