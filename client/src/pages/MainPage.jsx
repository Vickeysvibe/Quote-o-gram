import { React, useEffect, useState } from "react";
import { Quote } from "../components/Quote.jsx";
import axios from "axios";
import { Feed } from "../components/Feed.jsx";
export const MainPage = () => {
  const [quotes, setQuotes] = useState([]);
  const path = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const effect = async () => {
      try {
        const response = await axios.get(`${path}/quotes`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setQuotes(response.data.reverse());
      } catch (error) {
        console.error("Error", error);
      }
    };
    effect();
  }, [path]);
  return (
    <div className="main">
      <h1>Quotes</h1>
      <Feed />
      {quotes.map((user) => (
        <Quote key={user._id} user={user} />
      ))}
    </div>
  );
};
