import axios from "axios";

const path = process.env.REACT_APP_API_URL + "/quotes";
const token = localStorage.getItem("token");

export const getUserQuotes = async (userId) => {
  console.log(token);
  try {
    const response = await axios.get(`${path}/${userId}/userQuotes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.reverse();
  } catch (error) {
    console.error("Error", error);
  }
};
export const getQuote = async (userId) => {
  try {
    const response = await axios.get(`${path}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
};

export const editUserProfile = async (data) => {
  console.log(data);
};

export const getLikesCount = async (id) => {
  try {
    const response = await axios.get(`${path}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.likes.length;
  } catch (error) {
    console.error("Error", error);
  }
};

export const getQuoteComments = async (id) => {
  try {
    const response = await axios.get(`${path}/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.reverse();
  } catch (error) {
    console.error("Error", error);
  }
};

export const likeQuote = async (id) => {
  try {
    await axios.put(
      `${path}/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error", error);
  }
};
export const editQuote = async (id, quote) => {
  try {
    console.log("running");
    await axios.post(
      `${path}/${id}`,
      { quote },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return "success";
  } catch (error) {
    console.error("Error", error);
  }
};

export const deleteQuote = async (id) => {
  try {
    await axios.delete(`${path}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return "success";
  } catch (error) {
    console.error("Error", error);
  }
};
