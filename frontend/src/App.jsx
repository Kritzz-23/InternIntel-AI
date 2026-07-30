import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/login"} replace />}
        />

        <Route 
          path="/register" 
          element={<Register />} 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route
          path="/dashboard"
          element={localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
