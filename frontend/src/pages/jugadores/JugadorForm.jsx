import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { categorias, estadosJugador, manos } from "./constants";

const vacio = {
  nombre: "",
  apellidos: "",
  fechaNacimiento: "",
  email: "",
  telefono: "",
  categoria: "",
  estado: "activo",
  mano: "diestra",
};

export default function JugadorForm() {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(vacio);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editando) return;
    api.get(`/jugadores/${id}`).then((res) => {
      setForm({ ...vacio, ...res.data, fechaNacimiento: res.data.fechaNacimiento ?? "" });
    });
  }, [id, editando]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      if (editando) {
        await api.put(`/jugadores/${id}`, form);
      } else {
        await api.post("/jugadores", form);
      }
      navigate("/jugadores");
    } catch (err) {
      setError(err.response?.data?.message ?? "No se pudo guardar el jugador");
    }
  }

  return (
    <Layout title={editando ? "Editar jugador" : "Registrar jugador"}>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-sm">
        {error && <p className="text-sm text-danger">{error}</p>}

        <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <legend className="mb-2 font-semibold text-primary">Datos personales</legend>

          <div>
            <label htmlFor="nombre" className="mb-1 block text-sm text-gray-700">Nombre</label>
            <input id="nombre" name="nombre" required value={form.nombre} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="apellidos" className="mb-1 block text-sm text-gray-700">Apellidos</label>
            <input id="apellidos" name="apellidos" required value={form.apellidos} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="fechaNacimiento" className="mb-1 block text-sm text-gray-700">Fecha de nacimiento</label>
            <input id="fechaNacimiento" name="fechaNacimiento" type="date" value={form.fechaNacimiento ?? ""} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-gray-700">Correo electrónico</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="telefono" className="mb-1 block text-sm text-gray-700">Teléfono</label>
            <input id="telefono" name="telefono" value={form.telefono ?? ""} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm" />
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <legend className="mb-2 font-semibold text-primary">Datos deportivos</legend>

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

          <div>
            <label htmlFor="estado" className="mb-1 block text-sm text-gray-700">Estado</label>
            <select id="estado" name="estado" required value={form.estado} onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
              {estadosJugador.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <span className="mb-1 block text-sm text-gray-700">Mano dominante</span>
            <div className="flex gap-4">
              {manos.map((m) => (
                <label key={m.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="mano"
                    value={m.value}
                    checked={form.mano === m.value}
                    onChange={handleChange}
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <div className="flex gap-3">
          <button type="submit" className="rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light">
            Guardar jugador
          </button>
          <button type="button" onClick={() => navigate("/jugadores")}
            className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
        </div>
      </form>
    </Layout>
  );
}
