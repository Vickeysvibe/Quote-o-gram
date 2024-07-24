import React, { useEffect, useState } from "react";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    const { email, password } = user;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const end_point = process.env.REACT_APP_API_URL + "/auth/login";
      console.log(end_point);
      const res = await axios.post(end_point, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", JSON.stringify(res.data.user._id));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(res.data);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="fullScreen">
      <div className="container">
        <div className="clip">
          <div className="image"></div>
        </div>
        <div className="form">
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
            <p>
              Not having an account? <Link to={"/register"}>Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
