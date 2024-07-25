import React, { useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import axios from "axios";
import "../styles/layout.css";
export const Feed = ({ handleReload }) => {
  const path = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [quote, setQuote] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${path}/quotes/newQuote`,
        { quote: quote },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setQuote("");
        handleReload();
      }
    } catch (error) {
      console.error("Error sending quote:", error);
      alert("Failed to send quote. Please try again.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form className="inPanel" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="What's on your mind ?"
          value={quote}
          onChange={(ev) => {
            setQuote(ev.target.value);
          }}
        />
        <button type="submit">
          <FormatQuoteIcon />
        </button>
      </form>
    </div>
  );
};
