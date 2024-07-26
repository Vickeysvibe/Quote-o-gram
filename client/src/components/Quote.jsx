import React, { useEffect, useState } from "react";
import "../styles/quote.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../api/users/userData";
import {
  deleteQuote,
  editQuote,
  getLikesCount,
  getQuote,
  getQuoteComments,
  likeQuote,
} from "../api/quotes/quoteData";
import editIcon from "../assets/svg/editIcon.svg";
import deleteIcon from "../assets/svg/deleteIcon.svg";

export const Quote = ({ quoteId, isAdmin }) => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState({});
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [user, setUser] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setcomments] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedQuote = await getQuote(quoteId);
        setQuote(fetchedQuote);

        if (fetchedQuote) {
          const fetchedComments = await getQuoteComments(fetchedQuote._id);
          setcomments(fetchedComments);
          const fetchedUser = await getUserDetails(fetchedQuote.user);
          setUser(fetchedUser);
          const userId = JSON.parse(localStorage.getItem("user"))?._id;
          if (userId) {
            setLike(fetchedQuote.likes.includes(userId));
          }
          const fetchedLikeCount = await getLikesCount(fetchedQuote._id);
          setLikeCount(fetchedLikeCount);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUserData();
    }
  }, [quoteId, showComment, editStatus]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme !== theme) {
        setTheme(storedTheme);
      }
    }, 10); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, [theme]);

  const path = process.env.REACT_APP_API_URL;

  const handleLike = async () => {
    try {
      const newLikeStatus = !like;
      setLike(newLikeStatus);
      setLikeCount((prevCount) =>
        newLikeStatus ? prevCount + 1 : prevCount - 1
      );

      await likeQuote(quote._id);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${path}/quotes/${quote._id}/comment`,
        { content: comment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setComment("");
      setShowComment(!showComment);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditClick = () => {
    setEditStatus(!editStatus);
  };
  const handleUpdateQuote = async (e) => {
    e.preventDefault();
    await editQuote(quote._id, quote.quote);
    setEditStatus(!editStatus);
  };

  const handleDeleteQuote = async () => {
    await deleteQuote(quote._id);
    window.location.reload();
  };
  return (
    <div className="tweet-container">
      <div className="quote-image">
        <img src={user.profilePic} alt="profile pic" />
      </div>
      <div>
        <div
          className="title"
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
        >
          <div className="info">
            <h4 className="name">{user.name}</h4>
          </div>
          {isAdmin && (
            <div className="utils">
              <img onClick={handleEditClick} src={editIcon} alt="helllo" />
              <img onClick={handleDeleteQuote} src={deleteIcon} alt="helllo" />
            </div>
          )}
        </div>
        <div className="tweet">
          {!editStatus ? (
            <p>" {quote.quote} "</p>
          ) : (
            <form onSubmit={handleUpdateQuote}>
              <input
                type="text"
                value={quote.quote}
                onChange={(e) => setQuote({ ...quote, quote: e.target.value })}
              />
              <button type="submit">Update</button>
            </form>
          )}
        </div>
        <div className="time-and-date">
          <p>{new Date(quote.createdAt).toLocaleString()}</p>
        </div>
        <div className="bottom-section">
          {!like ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              onClick={handleLike}
              className="like-icon"
            >
              <g>
                <path
                  fill={theme === "dark" ? "white" : "black"}
                  d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
                ></path>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 36 36"
              onClick={handleLike}
              className="liked-icon"
            >
              <path
                fill="#dd2e44"
                d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242"
              />
            </svg>
          )}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="comment-icon"
            onClick={() => {
              setShowComment(!showComment);
            }}
          >
            <g>
              <path
                fill={theme === "dark" ? "white" : "black"}
                d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
              ></path>
            </g>
          </svg>
          <p>{likeCount}</p>
        </div>
        {showComment ? (
          <>
            {comments.map((com) => (
              <div key={com._id} className="comment">
                <img src={com.user.profilePic} alt="face" />
                <p>{com.content}</p>
              </div>
            ))}
            <form onSubmit={handleComment}>
              <input
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="comment here"
              />
            </form>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
