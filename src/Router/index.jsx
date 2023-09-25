import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Financeiro from "../pages/Financeiro";
import Arquivo from "../pages/Arquivo";
import Login from "../components/Login";
import { useContext } from "react";
import { Loader } from "lucide-react";

export default function Router() {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <Routes>
      {token ? (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/arquivo" element={<Arquivo />} />
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Route>
      ) : (
        <Route path="/" element={<Login />} />
      )}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
