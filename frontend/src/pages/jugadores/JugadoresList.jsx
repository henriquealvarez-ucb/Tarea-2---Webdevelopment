import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import Badge from "../../components/Badge";
import {
  categoriaLabel,
  estadoJugadorLabel,
  estadoJugadorTone,
  manoLabel,
} from "./constants";

export default function JugadoresList() {
  const [jugadores, setJugadores] = useState([]);
  const [error, setError] = useState("");

  function cargar() {
    api
      .get("/jugadores")
      .then((res) => setJugadores(res.data))
      .catch(() => setError("No se pudo cargar la lista de jugadores"));
  }

  useEffect(cargar, []);

  async function eliminar(id) {
    if (!confirm("¿Eliminar este jugador?")) return;
    try {
      await api.delete(`/jugadores/${id}`);
      cargar();
    } catch {
      alert("No se pudo eliminar el jugador (puede tener partidos asociados)");
    }
  }

  return (
    <Layout
      title="Jugadores"
      action={
        <Link
          to="/jugadores/nuevo"
          className="rounded bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          + Nuevo jugador
        </Link>
      }
    >
      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      <section className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Mano</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((j) => (
              <tr key={j.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  {j.nombre} {j.apellidos}
                </td>
                <td className="px-4 py-3">{categoriaLabel[j.categoria]}</td>
                <td className="px-4 py-3">{manoLabel[j.mano]}</td>
                <td className="px-4 py-3">
                  <Badge tone={estadoJugadorTone[j.estado]}>
                    {estadoJugadorLabel[j.estado]}
                  </Badge>
                </td>
                <td className="space-x-3 px-4 py-3">
                  <Link to={`/jugadores/${j.id}/editar`} className="text-accent hover:underline">
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => eliminar(j.id)}
                    className="text-danger hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {jugadores.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  Aún no hay jugadores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
