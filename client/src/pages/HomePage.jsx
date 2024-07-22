import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../data/userData";
import { Layout } from "../components/Layout";
export const HomePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    description: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      async function getUser() {
        const { name, email, description, profilePic } = await getUserDetails();
        setUser({ name, email, description, profilePic });
      }
      getUser();
      console.log(user);
    }
  }, [navigate]);
  return (
    <div>
      {/* <h1>
        Home Page logged in as {user.name} and {user.email}
      </h1>
      <button onClick={logout}>Logout</button> */}
      <Layout />
    </div>
  );
};
