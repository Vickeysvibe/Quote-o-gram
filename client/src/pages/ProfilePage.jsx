import React, { useEffect, useState } from "react";
import "../styles/layout.css";
import { Quote } from "../components/Quote";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { getUserDetails } from "../data/userData";

export const ProfilePage = () => {
  const { id } = useParams();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const userId = id ? id : localUser._id;
  const [user, setUser] = useState({});
  const [quotes, setQuotes] = useState([]);
  const path = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const effect = async () => {
      try {
        const response = await axios.get(
          `${path}/quotes/${userId}/userQuotes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setQuotes(response.data.reverse());
        setUser(
          id ? await getUserDetails(id) : await getUserDetails(localUser._id)
        );
      } catch (error) {
        console.error("Error", error);
      }
    };
    effect();
  }, [id, localUser._id, path, user, userId]);

  return (
    <Layout>
      <div className="main">
        <h1>Quotes</h1>
        <div className="user-profile">
          <img src={user.profilePic} alt="user" />
          <div className="user-info">
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <p>{user.description}</p>
          </div>
        </div>
        {quotes.map((user) => (
          <Quote key={user._id} user={user} />
        ))}
      </div>
    </Layout>
  );
};
