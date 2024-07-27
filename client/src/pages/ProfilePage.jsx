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

  useEffect(() => {
    const effect = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        const userId = id ? id : localUser._id;
        console.log(userId, localUser._id);
        setIsAdmin(userId === localUser._id);
        console.log(isAdmin);
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
    setUserTemp(user);
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
        <h1 onClick={handleRoute}>Quotes</h1>
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
              <img onClick={handleEditState} src={editProfile} alt="edit" />
            </div>
          )}
        </div>
        {quotes.map((quote) => (
          <Quote key={quote._id} quoteId={quote._id} isAdmin={isAdmin} />
        ))}
      </div>
    </Layout>
  );
};
