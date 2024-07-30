import React, { useEffect, useState } from "react";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    description: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [gender, setGender] = useState("boy");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    const { name, email, password, description, confirm_password } = user;

    if (!name || !email || !password || !confirm_password) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const end_point = process.env.REACT_APP_API_URL + "/auth/register";
      console.log(end_point);
      const data = { name, email, password, description, gender };
      const res = await axios.post(end_point, data);
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  return (
    <div className="fullScreen">
      <div className="container">
        <div className="clip">
          <div className="image"></div>
        </div>
        <div className="form">
          <h1>Register</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              required
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
            />
            <input
              required
              type="text"
              placeholder="Bio"
              value={user.description}
              onChange={(ev) =>
                setUser({ ...user, description: ev.target.value })
              }
            />
            <input
              required
              minlength="8"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
            />
            <input
              required
              minlength="8"
              type="password"
              placeholder="Confirm Password"
              value={user.confirm_password}
              onChange={(ev) =>
                setUser({ ...user, confirm_password: ev.target.value })
              }
            />
            <div className="gender">
              <input
                type="radio"
                id="html"
                name="fav_language"
                onChange={() => {
                  setGender("boy");
                }}
                value="HTML"
              />
                <label for="html">Boy</label> {" "}
              <input
                type="radio"
                id="css"
                name="fav_language"
                value="CSS"
                onChange={() => {
                  setGender("girl");
                }}
              />
                <label for="css">Girl</label>
            </div>
            <button type="submit">Register</button>
            <p>
              Already a user? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
