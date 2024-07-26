import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { MainPage } from "./MainPage";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!isAuthenticated) {
    console.log("to token");
    return null; // Render nothing or a loading spinner while redirecting
  }

  return (
    <div>
      <Layout>
        <MainPage />
      </Layout>
    </div>
  );
};
