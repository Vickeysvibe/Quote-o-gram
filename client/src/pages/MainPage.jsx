import { React, useEffect, useState } from "react";
import { Quote } from "../components/Quote.jsx";
import axios from "axios";
import { Feed } from "../components/Feed.jsx";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();
  const path = process.env.REACT_APP_API_URL;

  const effect = async () => {
    try {
      const response = await axios.get(`${path}/quotes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setQuotes(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    effect();
  }, []);

  const handleRoute = () => {
    navigate("/");
  };

  return (
    <div className="main">
      <h1 onClick={handleRoute}>Quotes</h1>
      <Feed handleReload={effect} />
      {quotes.map((quote) => (
        <Quote handleReload={effect} key={quote._id} quote={quote} />
      ))}
    </div>
  );
};
