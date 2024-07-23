import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../data/userData";
import "../styles/layout.css";
import { Profile } from "../components/Profile";
import { Feed } from "../components/forP/Feed";
import { Side } from "../components/Side";

export const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    description: "",
    profilePic: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const checkAdmin = () => {
        const userId = localStorage
          .getItem("userId")
          .replace(/^['"]|['"]$/g, "");
        if (userId === id) {
          setIsAdmin(true);
        }
      };

      async function fetchUser() {
        const { name, email, description, profilePic } = await getUserDetails();
        setUser({ name, email, description, profilePic });
      }

      checkAdmin();
      fetchUser();
    }
  }, [id, navigate]);

  return (
    <div className="full">
      <Navbar user={user} />
      <div className="container">
        <Profile isAdmin={isAdmin} />
        <Feed isAdmin={isAdmin} />
        <Side isAdmin={isAdmin} />
      </div>
    </div>
  );
};
