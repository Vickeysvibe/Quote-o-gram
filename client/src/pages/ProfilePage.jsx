import React, { useEffect, useState } from "react";
import "../styles/layout.css";
import { Quote } from "../components/Quote";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { getUserDetails, updateUser } from "../api/users/userData";
import { getUserQuotes } from "../api/quotes/quoteData";
import editProfile from "../assets/svg/editProfile.svg";

export const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userTemp, setUserTemp] = useState({});
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();
  const [editState, setEditState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  useEffect(() => {
    const effect = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        const userId = id ? id : localUser._id;
        console.log(userId, localUser._id);
        console.log(userId === localUser._id);
        setIsAdmin(userId === localUser._id);
        setQuotes(await getUserQuotes(userId));
        setUser(
          id ? await getUserDetails(id) : await getUserDetails(localUser._id)
        );
      } catch (error) {
        console.error("Error", error);
      }
    };
    effect();
  }, [id]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme !== theme) {
        setTheme(storedTheme);
      }
    }, 10); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, [theme]);
  useEffect(() => {
    setUserTemp(user);
    console.log(user);
  }, [user]);
  const handleRoute = () => {
    navigate("/");
  };
  const handleEditState = (e) => {
    setEditState(!editState);
  };
  const handleEditProfile = async (e) => {
    e.preventDefault();
    await updateUser(userTemp);
    setEditState(!editState);
    localStorage.setItem("user", JSON.stringify(userTemp));
    setUser(userTemp);
  };

  return (
    <Layout>
      <div className="main">
        <h1 onClick={handleRoute}>Profile</h1>
        {user.name ? (
          <div className="user-profile">
            <img src={user.profilePic} alt="user" />
            <div className="user-info">
              {!editState ? (
                <>
                  <h2>{user.name}</h2>
                  <h3>{user.email}</h3>
                  <p>{user.description}</p>
                </>
              ) : (
                <form onSubmit={handleEditProfile}>
                  <input
                    className="h2"
                    value={userTemp.name || ""}
                    onChange={(e) => {
                      setUserTemp({ ...userTemp, name: e.target.value });
                    }}
                    type="text"
                  />
                  <input
                    className="p"
                    value={userTemp.description || ""}
                    onChange={(e) => {
                      setUserTemp({ ...userTemp, description: e.target.value });
                    }}
                    type="text"
                  />
                  <button type="submit">Update</button>
                </form>
              )}
            </div>
            {isAdmin && (
              <div className="edit">
                <svg
                  onClick={handleEditState}
                  alt="edit"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="20"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill={theme === "dark" ? "white" : "black"}
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9l1.2-11.1l7.9-7.9l77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5m45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8l137.9-137.9l-71.7-71.7zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8l-4.1 4.1l71.8 71.7l41.8-41.8c9.3-9.4 9.3-24.5 0-33.9"
                  />
                </svg>
              </div>
            )}
          </div>
        ) : (
          <div className="user-profile skeleton"></div>
        )}
        {quotes.map((quote) => (
          <Quote key={quote._id} quoteId={quote._id} isAdmin={isAdmin} />
        ))}
      </div>
    </Layout>
  );
};
