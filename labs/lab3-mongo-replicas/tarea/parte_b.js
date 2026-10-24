// Tarea 3 — Parte B: ¿anidar las órdenes dentro del evento o referenciarlas?
// Se ejecuta como script (sin use ni show):
//   docker exec -i ti4601-tarea3 mongosh --quiet boleteria --file /dev/stdin \
//     < labs/lab3-mongo-replicas/tarea/parte_b.js | tee evidence/tarea3/parte-b.txt
// Persona C. No escribe nada en la base: solo mide documentos en memoria con bsonsize().

const LIMITE = 16 * 1024 * 1024; // 16 MiB = tamaño máximo de un documento BSON

// Una orden con los campos del Lab 3; _id de ancho fijo para que todas pesen lo mismo
function orden(i) {
  return {
    _id: "ORD-" + String(i).padStart(7, "0"),
    evento_id: "EV-0001",
    zona: "General",
    cantidad: 2,
    estado: "confirmada",
    creada_en: new Date("2026-10-24T12:00:00Z"),
  };
}

function eventoCon(n) {
  const ev = db.eventos.findOne({ _id: "EV-0001" });
  ev.ordenes = [];
  for (let i = 0; i < n; i++) ev.ordenes.push(orden(i));
  return ev;
}

// B1.1 — costo de una orden suelta (documento propio en la colección ordenes)
print("== B1 · orden suelta ==");
const bOrden = bsonsize(orden(0));
printjson({ orden: orden(0), bsonsize: bOrden });

// B1.2 — evento real sin órdenes
print("== B1 · evento sin órdenes ==");
const ev = db.eventos.findOne({ _id: "EV-0001" });
const bEvento = bsonsize(ev);
printjson({ _id: ev._id, zonas: ev.zonas.length, bsonsize: bEvento });

// B1.3 — costo real de una orden DENTRO del arreglo: medido con 1 000 órdenes embebidas
print("== B1 · costo de una orden embebida (medido con 1 000) ==");
const b0 = bsonsize(eventoCon(0));      // evento + arreglo "ordenes" vacío
const b1000 = bsonsize(eventoCon(1000));
printjson({
  evento_con_arreglo_vacio: b0,
  evento_con_1000_ordenes: b1000,
  bytes_por_orden_embebida: (b1000 - b0) / 1000,
  extra_sobre_orden_suelta: +((b1000 - b0) / 1000 - bOrden).toFixed(2),
  nota: "cada elemento paga 1 byte de tipo + su índice como string con terminador ('0', '1', …, '999')",
});

// B1.4 — cuántas órdenes caben antes de llegar a 16 MiB
print("== B1 · órdenes que caben en 16 MiB ==");
// estimación ingenua: ignora el costo del índice dentro del arreglo
const ingenua = Math.floor((LIMITE - bEvento) / bOrden);
// cálculo exacto: el elemento i cuesta bOrden + 1 (tipo) + longitud de "i" + 1 (terminador)
let total = b0, n = 0;
while (total + bOrden + 2 + String(n).length <= LIMITE) {
  total += bOrden + 2 + String(n).length;
  n++;
}
// comprobación construyendo el documento: n entra, n + 1 ya no
const bN = bsonsize(eventoCon(n));
const bN1 = bsonsize(eventoCon(n + 1));
printjson({
  limite_bytes: LIMITE,
  estimacion_ingenua: ingenua,
  maximo_exacto: n,
  bsonsize_con_maximo: bN,
  bsonsize_con_maximo_mas_1: bN1,
  cabe_maximo: bN <= LIMITE,
  cabe_maximo_mas_1: bN1 <= LIMITE,
  capacidad_del_evento: ev.zonas.reduce((s, z) => s + z.capacidad, 0),
});

// B1.5 — lo que pesa leer el evento a medida que se llena (cada find del evento trae todas las órdenes)
print("== B1 · peso del evento según órdenes embebidas ==");
[0, 100, 1000, 10000, 100000].forEach((k) =>
  printjson({ ordenes: k, bsonsize: bsonsize(eventoCon(k)), veces_el_evento: +(bsonsize(eventoCon(k)) / bEvento).toFixed(1) })
);
