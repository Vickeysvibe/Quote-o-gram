import axios from "axios";

export const getUserDetails = async () => {
  const path = process.env.REACT_APP_API_URL + "/users/myProfile";
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(path, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; // Re-throw the error after logging it
  }
};
