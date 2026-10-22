// Tarea 3 — Consultas y modelado de documentos en MongoDB (TI-4601)
//
// Se ejecuta completo, como script, desde la raíz del repositorio:
//
//   docker exec -i ti4601-tarea3 mongosh --quiet boleteria --file /dev/stdin \
//     < labs/lab3-mongo-replicas/tarea/consultas.js | tee evidence/tarea3/consultas.txt
//
// Reglas del script: sin `use` ni `show` (la base ya es boleteria); cada consulta imprime su
// encabezado con print("== Ax ==") y su resultado con printjson o .forEach(printjson).
// Cada integrante edita solo su bloque (ver todo.md).

// Resume un explain("executionStats") en las cuatro métricas que pide la tarea, más las etapas
// del plan ganador (de la raíz a la hoja), el índice usado y sus límites.
function resumenExplain(exp) {
  const etapas = [];
  let indice = null;
  let limites = null;
  const plan = exp.queryPlanner.winningPlan;
  for (let s = plan.queryPlan || plan; s; s = s.inputStage) {
    etapas.push(s.stage);
    if (s.indexName) {
      indice = s.indexName;
      limites = s.indexBounds;
    }
  }
  const e = exp.executionStats;
  return {
    etapas: etapas.join(" <- "),
    indice: indice,
    indexBounds: limites,
    nReturned: e.nReturned,
    totalKeysExamined: e.totalKeysExamined,
    totalDocsExamined: e.totalDocsExamined,
    executionTimeMillis: e.executionTimeMillis,
  };
}

// ============================================================ Persona A · A1 + índice
// A1 — nombre, recinto y fecha de los conciertos de Heredia entre el 1 de diciembre de 2026 y
// el 28 de febrero de 2027, por fecha. `fecha` es un string AAAA-MM-DD: su orden alfabético es
// el cronológico, así que el rango con $gte/$lte y el sort sobre strings son correctos.
const filtroA1 = {
  categoria: "concierto",
  ciudad: "Heredia",
  fecha: { $gte: "2026-12-01", $lte: "2027-02-28" },
};
const proyeccionA1 = { _id: 0, nombre: 1, recinto: 1, fecha: 1 };
const ordenA1 = { fecha: 1 };

print("== A1 ==");
db.eventos.find(filtroA1, proyeccionA1).sort(ordenA1).forEach(printjson);

// Índice compuesto, regla igualdad -> orden -> rango: categoria y ciudad son igualdades y van
// primero; fecha es a la vez el rango y el orden, y va al final para que el índice entregue las
// filas ya ordenadas (sin etapa SORT). El respaldo de este orden está en orden_indice.js.
const claveA1 = { categoria: 1, ciudad: 1, fecha: 1 };
const nombreA1 = "categoria_1_ciudad_1_fecha_1";

// Se borra antes de medir para que el "antes" sea un COLLSCAN aunque el script se repita.
if (db.eventos.getIndexes().some((i) => i.name === nombreA1)) {
  db.eventos.dropIndex(nombreA1);
}

print("== A1 · explain antes del índice ==");
printjson(resumenExplain(db.eventos.find(filtroA1, proyeccionA1).sort(ordenA1).explain("executionStats")));

print("== A1 · createIndex ==");
printjson(db.eventos.createIndex(claveA1));

print("== A1 · explain después del índice ==");
printjson(resumenExplain(db.eventos.find(filtroA1, proyeccionA1).sort(ordenA1).explain("executionStats")));

// ============================================================ Persona B · A2, A3, A4
// FALTA (Persona B): ver todo.md, Paso 5.
print("== A2 ==");
print("== A2 · comparación con y sin $elemMatch ==");
print("== A3 ==");
print("== A4 ==");

// ============================================================ Persona C · A5
// FALTA (Persona C): ver todo.md, Paso 6.
print("== A5 ==");
