import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { getUserDetails } from "../data/userData";
import axios from "axios";
import { useParams } from "react-router-dom";
export const Profile = (props) => {
  const removeQuotes = (str) => str.replace(/^['"]|['"]$/g, "");
  const { id } = useParams();
  const path = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    description: "",
    profilePic: "",
    password: "",
  });
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
    } else {
      async function getUser() {
        if (!id) {
          console.log("id not here");
          const { _id, name, email, description, profilePic, password } =
            await getUserDetails();
          setUser({ _id, name, email, description, profilePic, password });
        } else {
          console.log("id not here");
          const currUser = await axios.get(`${path}/users/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setUser(currUser.data);
        }
      }
      getUser();
    }
  }, [edit]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const upd = await axios.post(`${path}/users/myprofile/edit`, user, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEdit(!edit);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profile">
      {props.isAdmin && (
        <div
          className="edit"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          edit
        </div>
      )}
      {!edit ? (
        <>
          <h1>{user.name}</h1>
          <div className="image">
            <img src={user.profilePic} alt="face" />
          </div>
          <p>{user.description}</p>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
          <input
            type="text"
            value={user.description}
            onChange={(e) => {
              setUser({ ...user, description: e.target.value });
            }}
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};
