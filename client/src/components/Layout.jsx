import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../data/userData";
import "../styles/layout.css";
import { Profile } from "./Profile";
import { Feed } from "./Feed";
import { Side } from "./Side";
export const Layout = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    description: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      async function getUser() {
        const { name, email, description, profilePic } = await getUserDetails();
        setUser({ name, email, description, profilePic });
      }
      getUser();
    }
  }, [navigate]);

  return (
    <div className="full">
      <Navbar user={user} />
      <div className="container">
        <Profile user={user} isAdmin={true} />
        <Feed />
        <Side />
      </div>
    </div>
  );
};
