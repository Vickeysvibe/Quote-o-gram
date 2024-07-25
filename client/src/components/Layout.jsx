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
          <img onClick={() => setMenuOpen(!isMenuOpen)} src={menu} alt="E" />
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
