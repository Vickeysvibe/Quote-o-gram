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
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
