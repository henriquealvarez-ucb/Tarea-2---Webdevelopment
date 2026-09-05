import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import Badge from "../components/Badge";
import { estadoPartidoTone, estadoPartidoLabel } from "./partidos/constants";

export default function Dashboard() {
  const [jugadores, setJugadores] = useState([]);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    api.get("/jugadores").then((res) => setJugadores(res.data));
    api.get("/partidos").then((res) => setPartidos(res.data));
  }, []);

  const jugados = partidos.filter((p) => p.estado === "jugado");
  const programados = partidos.filter((p) => p.estado === "programado");
  const ultimos = partidos.slice(0, 5);

  return (
    <Layout title="Panel principal">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-3xl font-semibold text-primary">{jugadores.length}</p>
          <p className="text-sm text-gray-500">Jugadores registrados</p>
        </article>
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-3xl font-semibold text-primary">{jugados.length}</p>
          <p className="text-sm text-gray-500">Partidos jugados</p>
        </article>
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-3xl font-semibold text-primary">{programados.length}</p>
          <p className="text-sm text-gray-500">Próximos partidos</p>
        </article>
      </section>

      <section className="mt-6 rounded-lg bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-primary">Últimos partidos</h2>
          <Link to="/partidos" className="text-sm text-accent hover:underline">
            Ver todos &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">Equipo 1</th>
                <th className="py-2 pr-4">Equipo 2</th>
                <th className="py-2 pr-4">Resultado</th>
                <th className="py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ultimos.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2 pr-4">{p.fecha}</td>
                  <td className="py-2 pr-4">
                    {p.equipo1Jugador1.nombre} / {p.equipo1Jugador2.nombre}
                  </td>
                  <td className="py-2 pr-4">
                    {p.equipo2Jugador1.nombre} / {p.equipo2Jugador2.nombre}
                  </td>
                  <td className="py-2 pr-4">
                    {p.tantosEquipo1 ?? "—"} - {p.tantosEquipo2 ?? "—"}
                  </td>
                  <td className="py-2">
                    <Badge tone={estadoPartidoTone[p.estado]}>
                      {estadoPartidoLabel[p.estado]}
                    </Badge>
                  </td>
                </tr>
              ))}
              {ultimos.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    Aún no hay partidos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}
