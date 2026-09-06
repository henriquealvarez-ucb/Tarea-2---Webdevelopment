import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import Badge from "../../components/Badge";
import { canchaLabel, estadoPartidoLabel, estadoPartidoTone } from "./constants";

export default function PartidosList() {
  const [partidos, setPartidos] = useState([]);
  const [error, setError] = useState("");

  function cargar() {
    api
      .get("/partidos")
      .then((res) => setPartidos(res.data))
      .catch(() => setError("No se pudo cargar la lista de partidos"));
  }

  useEffect(cargar, []);

  async function eliminar(id) {
    if (!confirm("¿Eliminar este partido?")) return;
    try {
      await api.delete(`/partidos/${id}`);
      cargar();
    } catch {
      alert("No se pudo eliminar el partido");
    }
  }

  return (
    <Layout
      title="Partidos"
      action={
        <Link
          to="/partidos/nuevo"
          className="rounded bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          + Nuevo partido
        </Link>
      }
    >
      <p className="mb-4 text-sm text-gray-500">
        Partidos de frontón por parejas (2 contra 2), a un máximo de 16 tantos.
      </p>

      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      <section className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Equipo 1</th>
              <th className="px-4 py-3">Equipo 2</th>
              <th className="px-4 py-3">Cancha</th>
              <th className="px-4 py-3">Resultado</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {partidos.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="px-4 py-3">{p.fecha}</td>
                <td className="px-4 py-3">
                  {p.equipo1Jugador1.nombre} / {p.equipo1Jugador2.nombre}
                </td>
                <td className="px-4 py-3">
                  {p.equipo2Jugador1.nombre} / {p.equipo2Jugador2.nombre}
                </td>
                <td className="px-4 py-3">{canchaLabel[p.cancha]}</td>
                <td className="px-4 py-3">
                  {p.tantosEquipo1 ?? "—"} - {p.tantosEquipo2 ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <Badge tone={estadoPartidoTone[p.estado]}>
                    {estadoPartidoLabel[p.estado]}
                  </Badge>
                </td>
                <td className="space-x-3 px-4 py-3">
                  <Link to={`/partidos/${p.id}/editar`} className="text-accent hover:underline">
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => eliminar(p.id)}
                    className="text-danger hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {partidos.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                  Aún no hay partidos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
