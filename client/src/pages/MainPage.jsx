import { React, useEffect, useState } from "react";
import { Quote } from "../components/Quote.jsx";
import axios from "axios";
import { Feed } from "../components/Feed.jsx";
import { useNavigate } from "react-router-dom";
export const MainPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();
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
  }, [path, reload]);
  const handleRoute = () => {
    navigate("/");
  };
  const handleReload = () => {
    setReload(!reload);
  };
  return (
    <div className="main">
      <h1 onClick={handleRoute}>Quotes</h1>
      <Feed handleReload={handleReload} />
      {quotes.map((quote) => (
        <Quote key={quote._id} quoteId={quote._id} />
      ))}
    </div>
  );
};
