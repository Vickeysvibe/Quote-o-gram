import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
/* import dotenv from "dotenv";
dotenv.config(); */
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
