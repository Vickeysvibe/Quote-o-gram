import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { ProfilePage } from "./pages/ProfilePage";
import { Register } from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  localStorage.setItem("theme", "dark");
  localStorage.setItem("token", "");
  localStorage.setItem("user", "");
  localStorage.setItem("userId", "");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route path=":id" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
