import React, { useEffect, useState } from "react";
import { Quote } from "./Quote";
import axios from "axios";
export const Feeds = () => {
  const [quotes, setQuotes] = useState([]);
  const path = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const effect = async () => {
      try {
        const response = await axios.get(`${path}/quotes`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(response.data);
        setQuotes(response.data.reverse());
      } catch (error) {
        console.error("Error", error);
      }
    };
    effect();
  }, []);
  return (
    <div
      className="feeds"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {quotes.map((user) => (
        <Quote key={quotes._id} user={user} />
      ))}
    </div>
  );
};
