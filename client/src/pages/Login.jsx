import React from "react";
import side from "../assets/images/side.jpg";
import "../styles/register.css";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="fullScreen">
      <div className="container">
        <div className="clip">
          <div className="image"></div>
        </div>
        <div className="form">
          <h1>Login</h1>
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
            <p>
              Not having an account ? <Link to={"/register"}>Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
