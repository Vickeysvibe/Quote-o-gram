import React, { useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import axios from "axios";
import { Feeds } from "./Feeds";
export const Feed = () => {
  const path = process.env.REACT_APP_API_URL;
  /*     const userId=localStorage.getItem("userId")*/
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
        alert("Quote sent successfully");
      }
    } catch (error) {
      console.error("Error sending quote:", error);
      alert("Failed to send quote. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <div className="inPanel">
        <input
          type="text"
          placeholder="What's on your mind ?"
          value={quote}
          onChange={(ev) => {
            setQuote(ev.target.value);
          }}
        />
        <button onClick={handleSend}>
          <FormatQuoteIcon />
        </button>
      </div> */}
      <Feeds />
    </div>
  );
};
