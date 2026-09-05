export const categorias = [
  { value: "primera", label: "Primera" },
  { value: "segunda", label: "Segunda" },
  { value: "tercera", label: "Tercera" },
  { value: "infantil", label: "Infantil" },
];

export const estadosJugador = [
  { value: "activo", label: "Activo" },
  { value: "lesionado", label: "Lesionado" },
  { value: "inactivo", label: "Inactivo" },
];

export const manos = [
  { value: "diestra", label: "Diestra" },
  { value: "zurda", label: "Zurda" },
];

export const estadoJugadorTone = {
  activo: "success",
  lesionado: "warning",
  inactivo: "neutral",
};

export const categoriaLabel = Object.fromEntries(
  categorias.map((c) => [c.value, c.label]),
);

export const estadoJugadorLabel = Object.fromEntries(
  estadosJugador.map((e) => [e.value, e.label]),
);

export const manoLabel = Object.fromEntries(manos.map((m) => [m.value, m.label]));
