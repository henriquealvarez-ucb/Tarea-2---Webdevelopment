import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import JugadoresList from "./pages/jugadores/JugadoresList";
import JugadorForm from "./pages/jugadores/JugadorForm";
import PartidosList from "./pages/partidos/PartidosList";
import PartidoForm from "./pages/partidos/PartidoForm";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jugadores" element={<JugadoresList />} />
            <Route path="/jugadores/nuevo" element={<JugadorForm />} />
            <Route path="/jugadores/:id/editar" element={<JugadorForm />} />
            <Route path="/partidos" element={<PartidosList />} />
            <Route path="/partidos/nuevo" element={<PartidoForm />} />
            <Route path="/partidos/:id/editar" element={<PartidoForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
