import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { categorias } from "../jugadores/constants";
import { canchas, estadosPartido } from "./constants";

const vacio = {
  fecha: "",
  hora: "",
  cancha: "",
  categoria: "",
  estado: "programado",
  tantosEquipo1: "",
  tantosEquipo2: "",
  equipo1Jugador1Id: "",
  equipo1Jugador2Id: "",
  equipo2Jugador1Id: "",
  equipo2Jugador2Id: "",
};

export default function PartidoForm() {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(vacio);
  const [jugadores, setJugadores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/jugadores").then((res) => setJugadores(res.data));
  }, []);

  useEffect(() => {
    if (!editando) return;
    api.get(`/partidos/${id}`).then((res) => {
      const p = res.data;
      setForm({
        fecha: p.fecha,
        hora: p.hora,
        cancha: p.cancha,
        categoria: p.categoria,
        estado: p.estado,
        tantosEquipo1: p.tantosEquipo1 ?? "",
        tantosEquipo2: p.tantosEquipo2 ?? "",
        equipo1Jugador1Id: p.equipo1Jugador1.id,
        equipo1Jugador2Id: p.equipo1Jugador2.id,
        equipo2Jugador1Id: p.equipo2Jugador1.id,
        equipo2Jugador2Id: p.equipo2Jugador2.id,
      });
    });
  }, [id, editando]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const payload = {
      ...form,
      tantosEquipo1: form.tantosEquipo1 === "" ? undefined : Number(form.tantosEquipo1),
      tantosEquipo2: form.tantosEquipo2 === "" ? undefined : Number(form.tantosEquipo2),
      equipo1Jugador1Id: Number(form.equipo1Jugador1Id),
      equipo1Jugador2Id: Number(form.equipo1Jugador2Id),
      equipo2Jugador1Id: Number(form.equipo2Jugador1Id),
      equipo2Jugador2Id: Number(form.equipo2Jugador2Id),
    };

    try {
      if (editando) {
        await api.put(`/partidos/${id}`, payload);
      } else {
        await api.post("/partidos", payload);
      }
      navigate("/partidos");
    } catch (err) {
      setError(err.response?.data?.message ?? "No se pudo guardar el partido");
    }
  }

  function SelectorJugador({ name, label }) {
    return (
      <div>
        <label htmlFor={name} className="mb-1 block text-sm text-gray-700">{label}</label>
        <select id={name} name={name} required value={form[name]} onChange={handleChange}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
          <option value="">Selecciona un jugador</option>
          {jugadores.map((j) => (
            <option key={j.id} value={j.id}>{j.nombre} {j.apellidos}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <Layout title={editando ? "Editar partido" : "Registrar partido"}>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-sm">
        {error && <p className="text-sm text-danger">{error}</p>}
        <p className="text-sm text-gray-500">
          Partido de frontón por parejas (2 contra 2), a un máximo de 16 tantos.
        </p>

        <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <legend className="mb-2 font-semibold text-primary">Datos del partido</legend>

          <div>
            <label htmlFor="fecha" className="mb-1 block text-sm text-gray-700">Fecha</label>
            <input id="fecha" name="fecha" type="date" required value={form.fecha} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="hora" className="mb-1 block text-sm text-gray-700">Hora</label>
            <input id="hora" name="hora" type="time" required value={form.hora} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="cancha" className="mb-1 block text-sm text-gray-700">Cancha</label>
            <select id="cancha" name="cancha" required value={form.cancha} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
              <option value="">Selecciona una cancha</option>
              {canchas.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="categoria" className="mb-1 block text-sm text-gray-700">Categoría</label>
            <select id="categoria" name="categoria" required value={form.categoria} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
              <option value="">Selecciona una categoría</option>
              {categorias.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <legend className="mb-2 font-semibold text-primary">Equipo 1</legend>
          <SelectorJugador name="equipo1Jugador1Id" label="Jugador 1" />
          <SelectorJugador name="equipo1Jugador2Id" label="Jugador 2" />
        </fieldset>

        <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <legend className="mb-2 font-semibold text-primary">Equipo 2</legend>
          <SelectorJugador name="equipo2Jugador1Id" label="Jugador 1" />
          <SelectorJugador name="equipo2Jugador2Id" label="Jugador 2" />
        </fieldset>

        <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <legend className="mb-2 font-semibold text-primary">Resultado</legend>

          <div>
            <label htmlFor="tantosEquipo1" className="mb-1 block text-sm text-gray-700">Tantos equipo 1</label>
            <input id="tantosEquipo1" name="tantosEquipo1" type="number" min="0" max="16"
              placeholder="0-16" value={form.tantosEquipo1} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="tantosEquipo2" className="mb-1 block text-sm text-gray-700">Tantos equipo 2</label>
            <input id="tantosEquipo2" name="tantosEquipo2" type="number" min="0" max="16"
              placeholder="0-16" value={form.tantosEquipo2} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="estado" className="mb-1 block text-sm text-gray-700">Estado</label>
            <select id="estado" name="estado" required value={form.estado} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
              {estadosPartido.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>
        </fieldset>

        <div className="flex gap-3">
          <button type="submit" className="rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light">
            Guardar partido
          </button>
          <button type="button" onClick={() => navigate("/partidos")}
            className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
        </div>
      </form>
    </Layout>
  );
}
