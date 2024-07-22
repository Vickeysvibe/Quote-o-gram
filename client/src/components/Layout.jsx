import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../data/userData";

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
    </div>
  );
};
