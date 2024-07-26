import axios from "axios";

const path = process.env.REACT_APP_API_URL + "/users";
const token = () => localStorage.getItem("token");
export const getUserDetails = async (id) => {
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${path}/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const updateUser = async (data) => {
  if (!token()) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.post(
      `${path}/myProfile/edit`,
      { updates: data },
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; // Re-throw the error after logging it
  }
};
