import React, { useState } from "react";
import side from "../assets/images/side.jpg";
import "../styles/register.css";
import { Link } from "react-router-dom";
import axios from "axios";
export const Register = () => {
  const end_point = process.env.REACT_APP_API_URL + "/auth/register";
  console.log(end_point);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirm_password) {
      alert("Passwords do not match");
    } else {
      const { name, email, password } = user;
      const data = { name, email, password };
      const res = await axios.post(end_point, data);
      console.log(res.data);
    }
  };

  return (
    <div className="fullScreen">
      <div className="container">
        <div className="clip">
          <div className="image"></div>
        </div>
        <div className="form">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={user.confirm_password}
              onChange={(ev) =>
                setUser({ ...user, confirm_password: ev.target.value })
              }
            />
            <button type="submit">Register</button>
            <p>
              Already a user ? <Link to={"/"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
