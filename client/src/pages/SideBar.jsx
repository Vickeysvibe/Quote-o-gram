import React, { useEffect, useState } from "react";
import Home from "../assets/svg/home.svg";
import profile from "../assets/svg/profile.svg";
import about from "../assets/svg/about.svg";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import axios from "axios";
export const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(
    pathname.includes("profile") ? "profile" : "home"
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const [count, setCount] = useState(0);
  const path = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const effect = async () => {
      try {
        const response = await axios.get(
          `${path}/quotes/${user._id}/userQuotes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCount(response.data.length);
      } catch (error) {
        console.error("Error", error);
      }
    };
    effect();
  }, [user._id, path]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleRouting = (to) => {
    setActive(to);
    navigate(to === "home" ? "/" : to === "myProfile" ? "/profile" : "/");
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul>
        <li
          className={active === "home" ? "active" : "nope"}
          onClick={() => {
            handleRouting("home");
          }}
        >
          <img src={Home} alt="home" /> <p>Home</p>
        </li>
        <li
          className={active === "profile" ? "active" : "nope"}
          onClick={() => {
            handleRouting("myProfile");
          }}
        >
          <img src={profile} alt="myProfile" /> <p>Profile</p>
        </li>
        <li
          className={active === "about" ? "active" : "nope"}
          onClick={() => {
            handleRouting("about");
          }}
        >
          <img src={about} alt="about" /> <p>about</p>
        </li>
      </ul>
      <div className="profile">
        <div className="containee">
          <img src={user.profilePic} alt="face" />
        </div>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <p>{user.description}</p>
        <div className="count">
          <h1>{count}</h1>
          <p>Quotes</p>
        </div>
        <button onClick={logout} className="button-9">
          Log out
        </button>
      </div>
    </div>
  );
};
