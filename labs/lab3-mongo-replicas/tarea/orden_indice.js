// Tarea 3 — respaldo del orden de los campos del índice de A1.
//
// Mide la consulta de A1 con cinco índices compuestos, uno a la vez (hint para forzarlo), y
// compara claves y documentos examinados. Al terminar deja la colección solo con _id;
// consultas.js vuelve a crear su índice.
//
//   docker exec -i ti4601-tarea3 mongosh --quiet boleteria --file /dev/stdin \
//     < labs/lab3-mongo-replicas/tarea/orden_indice.js | tee evidence/tarea3/indice-orden.txt

const filtro = {
  categoria: "concierto",
  ciudad: "Heredia",
  fecha: { $gte: "2026-12-01", $lte: "2027-02-28" },
};
const proyeccion = { _id: 0, nombre: 1, recinto: 1, fecha: 1 };
const orden = { fecha: 1 };

const candidatos = [
  { clave: { categoria: 1, ciudad: 1, fecha: 1 }, nota: "propuesto: igualdad, igualdad, rango/orden" },
  { clave: { ciudad: 1, categoria: 1, fecha: 1 }, nota: "mismas igualdades en otro orden" },
  { clave: { categoria: 1, fecha: 1, ciudad: 1 }, nota: "rango antes de la segunda igualdad" },
  { clave: { fecha: 1, categoria: 1, ciudad: 1 }, nota: "rango primero" },
  { clave: { categoria: 1, fecha: 1 }, nota: "el índice del Paso 5 del Lab 3, sin ciudad" },
];

function medir(clave) {
  const exp = db.eventos.find(filtro, proyeccion).sort(orden).hint(clave).explain("executionStats");
  const etapas = [];
  const plan = exp.queryPlanner.winningPlan;
  for (let s = plan.queryPlan || plan; s; s = s.inputStage) etapas.push(s.stage);
  const e = exp.executionStats;
  return {
    etapas: etapas.join(" <- "),
    nReturned: e.nReturned,
    totalKeysExamined: e.totalKeysExamined,
    totalDocsExamined: e.totalDocsExamined,
  };
}

print("== Contexto ==");
printjson({
  eventos: db.eventos.countDocuments({}),
  en_el_rango_de_fechas: db.eventos.countDocuments({ fecha: filtro.fecha }),
  conciertos_en_el_rango: db.eventos.countDocuments({ categoria: "concierto", fecha: filtro.fecha }),
  respuesta_A1: db.eventos.countDocuments(filtro),
});

for (const c of candidatos) {
  db.eventos.dropIndexes();
  const nombre = db.eventos.createIndex(c.clave);
  print("== " + nombre + " ==");
  printjson(Object.assign({ nota: c.nota }, medir(c.clave)));
}
db.eventos.dropIndexes();
