import React from "react";
import { changeTheme } from "./test/injectCss";
import "../styles/test.css";
export const RightBar = () => {
  const handleThemeChange = () => {
    changeTheme();
  };

  return (
    <>
      <div className="right">
        <label className="switch">
          <input onChange={handleThemeChange} type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </>
  );
};
