import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import Navbar from "./components/NavBar";
import Documents from "./screens/DocumentList";
import Logs from "./screens/LogList";
import SigIn from "./screens/SignIn";
import Logout from "./screens/Logout";

import { AuthProvider } from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Private from "./contexts/Private";

function AppRoutes() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer autoClose={1500} />
          <Routes>
            <Route path="/" element={<SigIn />} />
            <Route
              path="/home"
              element={
                <Private>
                  <Home />
                </Private>
              }
            />
            <Route
              path="/documents"
              element={
                <Private>
                  <Documents />
                </Private>
              }
            />
            <Route
              path="/logs"
              element={
                <Private>
                  <Logs />
                </Private>
              }
            />
            <Route
              path="/logout"
              element={
                <Private>
                  <Logout />
                </Private>
              }
            />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
