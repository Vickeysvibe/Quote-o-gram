import "../styles/layout.css";
import { SideBar } from "../pages/SideBar";
import { RightBar } from "../pages/RightBar";
import "../styles/test.css";
import menu from "../assets/svg/menu.svg";
import { useEffect, useState } from "react";

export const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    console.log("layout");
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (width >= 768) {
    return (
      <div className="overall">
        <div className="toggle">
          <img
            onClick={() => {
              setMenuOpen(!isMenuOpen);
            }}
            src={menu}
            alt="E"
          />
        </div>
        <SideBar />
        {children}
        <RightBar />
      </div>
    );
  } else {
    return (
      <div className="overall">
        <div className="toggle">
          <svg
            onClick={() => setMenuOpen(!isMenuOpen)}
            src={menu}
            alt="E"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill={
                localStorage.getItem("theme") === "dark" ? "white" : "black"
              }
              d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
            />
          </svg>
        </div>
        {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
        <div className={`sidebar- ${isMenuOpen ? "sidebar-open" : ""}`}>
          <SideBar />
        </div>
        <div className="content">{children}</div>
        <RightBar />
      </div>
    );
  }
};
