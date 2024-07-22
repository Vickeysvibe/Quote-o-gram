import React from "react";
import "../styles/profile.css";
export const Profile = (props) => {
  const name = "shuaib";
  return (
    <div className="profile">
      <h1>{props.user.name}</h1>
      <div className="image">
        <img src={props.user.profilePic} alt="face" />
      </div>
      <p>{props.user.description}</p>
    </div>
  );
};
