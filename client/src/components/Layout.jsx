import "../styles/layout.css";
import { SideBar } from "../pages/SideBar";
import { RightBar } from "../pages/RightBar";
import "../styles/test.css";
export const Layout = ({ children }) => {
  return (
    <div className="overall">
      <SideBar />
      {children}
      <RightBar />
    </div>
  );
};
