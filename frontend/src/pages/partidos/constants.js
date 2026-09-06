export const canchas = [
  { value: "cancha-1", label: "Cancha 1" },
  { value: "cancha-2", label: "Cancha 2" },
  { value: "cancha-cubierta", label: "Cancha cubierta" },
];

export const estadosPartido = [
  { value: "programado", label: "Programado" },
  { value: "jugado", label: "Jugado" },
  { value: "cancelado", label: "Cancelado" },
];

export const estadoPartidoTone = {
  programado: "warning",
  jugado: "success",
  cancelado: "danger",
};

export const estadoPartidoLabel = Object.fromEntries(
  estadosPartido.map((e) => [e.value, e.label]),
);

export const canchaLabel = Object.fromEntries(canchas.map((c) => [c.value, c.label]));
