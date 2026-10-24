# TODO — Tarea 3: Consultas y modelado de documentos en MongoDB

> Enunciado oficial: [labs/lab3-mongo-replicas/TAREA.md](labs/lab3-mongo-replicas/TAREA.md)
> **Entrega:** miércoles 28 de octubre de 2026, 11:00 pm — PDF (máx. **2 páginas**) en TEC Digital + enlace al repo.
> **Valor:** 1,5 %. Prepara el [Laboratorio 3](labs/lab3-mongo-replicas/README.md) (martes 3 de noviembre):
> misma boletería, pero en un MongoDB de **un solo nodo**, sin conjunto de réplicas.

Reglas que no se negocian:

- Toda la evidencia va en `evidence/tarea3/`. **Cifra sin archivo que la respalde = 0 puntos.**
- `labs/lab3-mongo-replicas/tarea/consultas.js` tiene que correr **completo** (si no, A1–A5 a la mitad).
- Commits de **los tres integrantes**, repartidos en la semana.

---

## Estado actual (actualizado por A el 22 oct)

| Persona | Hecho | Pendiente |
| ------- | ----- | --------- |
| **A** | Pasos 0–4: repo, entorno, esqueleto de `consultas.js`, A1 + índice + `explain`, orden del índice, base del informe, invitaciones a B y C | fusionar `fabricio` → `main` · Paso 7 (espera a B y C) |
| **B** | — | Paso 1 en su máquina, Paso 5 (A2, comparación, A3, A4), su sección del informe |
| **C** | — | Paso 1 en su máquina, Paso 6 (A5, `parte_b.js`), su sección del informe |

Leyenda: «hecho» va con el commit que lo respalda; «pendiente», con lo que lo bloquea.

---

## Reparto del trabajo

> Rellene los nombres de B y C. Cada paso más abajo indica su responsable.

| Persona | Nombre | Bloque | Archivos | Puntos que defiende | Informe |
| ------- | ------ | ------ | -------- | ------------------- | ------- |
| **A** | Fabricio Mena | Entorno, esqueleto, **A1 + índice/explain** | `tarea/consultas.js` (esqueleto + bloque A1), `tarea/orden_indice.js` | A1 (9) + índice (15) = 24 | Sección A1 + índice, **armar el PDF final** y ejecución final |
| **B** | _______ | **A2** (+ comparación sin `$elemMatch`), **A3**, **A4** | bloques A2–A4 de `tarea/consultas.js` | 9 + 10 + 9 + 9 = 37 | A2 (comparación), A3, A4 |
| **C** | _______ | **A5** y **Parte B** (embeber o referenciar) | bloque A5 de `tarea/consultas.js`, `tarea/parte_b.js` | 9 + 30 = 39 | A5 + Parte B (media página) |

A arma el entorno y el esqueleto primero; B y C trabajan en paralelo sobre bloques distintos del mismo archivo, así
que no deberían chocar al fusionar.

### Calendario sugerido

| Fecha | Quién | Qué |
| ----- | ----- | --- |
| jue 22 – vie 23 oct | A | Pasos 0–4: repo, entorno, esqueleto, A1 + índice, base del informe; PR `fabricio` → `main` |
| sáb 24 – dom 25 oct | B y C | Paso 1 en su máquina; B: Paso 5 · C: Paso 6 (cada uno en su rama, con commits) |
| lun 26 oct | B y C | Su sección del informe; PR de su rama → `main` |
| mar 27 oct | A | Paso 7: ejecución final completa, PDF, lista de control |
| mié 28 oct, 11:00 pm | A | Subir PDF + enlace al repo a TEC Digital (queda un día de margen) |

### Flujo de ramas

- Cada quien trabaja en **su rama** (A: `fabricio`; B y C: la suya, p. ej. con su nombre) y abre un PR a `main`.
- B y C crean su rama desde `main` **después** de que se fusione `fabricio` (ahí está el esqueleto de `consultas.js`).
- En `consultas.js` cada quien edita **solo su bloque** (están delimitados con comentarios `Persona X`).
- La evidencia final `evidence/tarea3/consultas.txt` la regenera A en el Paso 7, con todo fusionado.

### Checklist — Persona A

- [x] Paso 0 · Crear el repo público y subir el entorno del curso — hecho en `30f7c77`, `f97c197` (en `main`)
- [x] Paso 0 · Invitar a B y C como colaboradores en GitHub — hecho: invitaciones enviadas a `ChrisRC7` y `AlissonRM19` (cada uno debe aceptarla en GitHub)
- [x] Paso 1 · `make build` + contenedor `ti4601-tarea3` + semilla + `mongoimport` → `datos-manifest.txt`, `import.txt`, `comandos.md` · commit — hecho en `650d846`
- [x] Paso 2 · Esqueleto de `tarea/consultas.js` (encabezados A1–A5, un bloque por persona) · commit — hecho en `9839139`
- [x] Paso 3 · **A1** + `explain` antes/después + `createIndex` → `consultas.txt` · commit — hecho en `8af87c7` (7 eventos; `COLLSCAN` 400 docs → `IXSCAN` 7/7/7)
- [x] Paso 3 · Orden de los campos del índice medido → `indice-orden.txt` · commit — hecho en `c8599f4` (7 claves contra 30 / 90 / 31)
- [x] Paso 4 · Esqueleto del informe `tarea/INFORME.tex` con la sección de A1 e índice · commit — hecho en `1d28b1f`
- [ ] Paso 4 · Fusionar `fabricio` en `main` (PR) para que B y C partan del esqueleto — pendiente: revisión de A (no depende de B ni C)
- [ ] Paso 7 · Ejecución final completa de `consultas.js` (con A2–A5 ya fusionados) → `consultas.txt` · commit — pendiente: **B** (A2–A4) y **C** (A5)
- [ ] Paso 7 · Armar el PDF final (≤ 2 páginas) + revisión de `FALTA` + lista de control — pendiente: **B** y **C** (sus secciones, `parte-b.txt` y sus nombres)

### Checklist — Persona B

- [x] Paso 1 en su máquina (contenedor + semilla; compare el `sha256` con `evidence/tarea3/datos-manifest.txt`, sin subir evidencia)
- [x] Paso 5 · **A2** con `$elemMatch` en filtro y proyección · commit
- [x] Paso 5 · **A2 · comparación** con y sin `$elemMatch` (conteo de ambas impreso en `consultas.js`) · commit
- [x] Paso 5 · **A3** (`$nin` sobre la categoría, consulta sobre arreglo) · commit
- [x] Paso 5 · **A4** (`$exists` + `$group`) · commit
- [x] Informe: A2–A4 y explicación de la diferencia de A2 (con los dos números)

### Checklist — Persona C

- [ ] Paso 1 en su máquina (igual que B)
- [ ] Paso 6 · **A5** (`$unwind` + `$group` + `$sort`) · commit
- [ ] Paso 6 · **Parte B.1** `tarea/parte_b.js` con `bsonsize()` → `evidence/tarea3/parte-b.txt` · commit
- [ ] Informe: A5 + Parte B en **media página** (B.1 cálculo, B.2 concurrencia, B.3 regla + otro dominio)

---

## Paso 0 — Repo propio · Responsable: A · hecho

El repo es copia del repo del curso con historia propia: <https://github.com/fabrimena/TAREA-3-Bases-de-Datos-Avanzadas>.

> **Atención:** `.env` está en `.gitignore` (tiene la licencia de CockroachDB). No lo agreguen con `git add -f`.
> `.env.example` va sin la licencia (`# COCKROACH_LICENSE=`).

B y C, cuando A los invite:

```bash
git clone https://github.com/fabrimena/TAREA-3-Bases-de-Datos-Avanzadas.git
cd TAREA-3-Bases-de-Datos-Avanzadas
git checkout -b <su-nombre> main      # después de que A fusione fabricio
```

---

## Paso 1 — Entorno (una sola vez) · Responsable: A (evidencia) · B y C (solo en su máquina) · A: hecho · B y C: pendiente

**HOST**, desde la raíz del repo:

```bash
mkdir -p evidence/tarea3
test -f evidence/tarea3/comandos.md \
  || printf '# Registro de comandos — Tarea 3\n\n' > evidence/tarea3/comandos.md

make build                                         # imagen del curso, con pymongo
docker run -d --name ti4601-tarea3 mongo:8.0       # MongoDB de un nodo, solo para la tarea

docker compose run --rm --no-deps app \
  python3 labs/lab3-mongo-replicas/generar_datos.py | tee evidence/tarea3/datos-manifest.txt

docker exec -i ti4601-tarea3 mongoimport --db boleteria --collection eventos --drop \
  < labs/lab3-mongo-replicas/data/eventos.jsonl 2>&1 | tee evidence/tarea3/import.txt
```

Ayuda para el registro (péguela en cada terminal HOST nueva):

```bash
log() { printf -- '- %s · Paso %s · `%s` · %s\n' "$(date '+%F %T')" "$1" "$2" "${3:-OK}" >> evidence/tarea3/comandos.md; }
# ejemplo:  log 1 "generar_datos + mongoimport (400)" OK
```

Esperado: manifiesto con `semilla: 2026`, `eventos: 400`, `zonas: 1189`, `capacidad_total: 162810` y
`sha256_eventos_jsonl: 9fc6a2db…4774a`; `mongoimport` termina con `400 document(s) imported successfully`.
B y C: si su `sha256` no coincide, **no sigan**: tienen otra semilla y sus cifras no van a cuadrar.

Abrir `mongosh` para probar: `docker exec -it ti4601-tarea3 mongosh boleteria`.

---

## Paso 2 — Esqueleto de `consultas.js` · Responsable: A · hecho

Archivo: `labs/lab3-mongo-replicas/tarea/consultas.js`. Se ejecuta como **script**, así que:

- nada de `use` ni `show` (la base ya es `boleteria`);
- cada resultado se imprime con `.forEach(printjson)` o `printjson(...)`;
- cada consulta imprime su encabezado antes del resultado: `print("== A1 ==")`.

El esqueleto trae los cinco encabezados y un bloque comentado por persona. Ejecutarlo completo:

```bash
docker exec -i ti4601-tarea3 mongosh --quiet boleteria --file /dev/stdin \
  < labs/lab3-mongo-replicas/tarea/consultas.js | tee evidence/tarea3/consultas.txt
```

---

## Paso 3 — A1 e índice compuesto · Responsable: A · hecho

**A1.** Nombre, recinto y fecha de los conciertos de Heredia entre el 2026-12-01 y el 2027-02-28, por fecha.
Esperado: **7 eventos**, del `2026-12-02` al `2027-02-26`.

**Índice.** `explain("executionStats")` **antes** y **después** de `createIndex({ categoria: 1, ciudad: 1, fecha: 1 })`.
El bloque borra el índice al inicio para que el "antes" sea siempre un `COLLSCAN`, aunque el script se corra varias veces.

| | Etapa | `totalKeysExamined` | `totalDocsExamined` | `nReturned` |
| --- | --- | ---: | ---: | ---: |
| antes | `COLLSCAN` + `SORT` | 0 | 400 | 7 |
| después | `IXSCAN` → `FETCH` (sin `SORT`) | 7 | 7 | 7 |

Para el informe (orden de campos, regla **igualdad → orden → rango**): `categoria` y `ciudad` son igualdades y van
primero; `fecha` es a la vez rango y orden y va al final, así el índice entrega las filas ya ordenadas. Respaldo
medido en `evidence/tarea3/indice-orden.txt` (`tarea/orden_indice.js`): con `fecha` primero se examinan 90 claves; con
`{categoria, fecha, ciudad}`, 30; con el `{categoria, fecha}` del Lab 3, 31 claves y 31 documentos. **Argumente con
claves y documentos examinados, no con ms** (400 documentos tardan ~1 ms en cualquier caso).

---

## Paso 4 — Base del informe y PR · Responsable: A · informe: hecho · PR: pendiente

- `labs/lab3-mongo-replicas/tarea/INFORME.tex`: misma plantilla de los informes del Lab 1 y Lab 2. Cada sección
  pendiente usa la macro `\falta{Persona X: ...}` (sale en rojo); B y C reemplazan **solo** la suya.
- PR `fabricio` → `main` cuando el esqueleto corra completo.

---

## Paso 5 — A2, A3 y A4 · Responsable: B

Predicción ANTES de correr: ¿la versión sin `$elemMatch` devuelve más, menos o los mismos eventos? ¿Por qué?

Pegue en su bloque de `consultas.js` (entre los comentarios `Persona B`):

```javascript
// A2 — zona VIP con precio < 48 000: $elemMatch en el filtro (la misma zona cumple ambas condiciones)
//      y en la proyección (devuelve solo el elemento VIP del arreglo)
const filtroA2 = { zonas: { $elemMatch: { nombre: "VIP", precio: { $lt: 48000 } } } };
print("== A2 ==");
db.eventos.find(filtroA2, { _id: 0, nombre: 1, zonas: { $elemMatch: { nombre: "VIP" } } })
  .forEach(printjson);

print("== A2 · comparación con y sin $elemMatch ==");
printjson({
  con_elemMatch: db.eventos.countDocuments(filtroA2),
  sin_elemMatch: db.eventos.countDocuments({ "zonas.nombre": "VIP", "zonas.precio": { $lt: 48000 } }),
});

// A3 — etiqueta "accesible" (igualdad sobre un arreglo = "contiene") y categoría fuera de la lista
print("== A3 ==");
db.eventos.find(
  { etiquetas: "accesible", categoria: { $nin: ["teatro", "conferencia"] } },
  { _id: 0, nombre: 1 }
).forEach(printjson);

// A4 — eventos SIN patrocinador (el campo no existe; no es null), por categoría
print("== A4 ==");
db.eventos.aggregate([
  { $match: { patrocinador: { $exists: false } } },
  { $group: { _id: "$categoria", eventos: { $sum: 1 } } },
  { $sort: { _id: 1 } },
]).forEach(printjson);
```

Esperado: A2 **195** eventos con `$elemMatch` contra **265** sin él; A3 **91** eventos; A4 cinco grupos que suman
**275** (concierto 57, conferencia 61, deporte 58, festival 49, teatro 50).

Para el informe:
- **A2:** sin `$elemMatch` cada condición puede cumplirla **una zona distinta** del mismo evento: cualquier evento con
  VIP pasa, porque su zona General (8 000) satisface `precio < 48000`. Los 70 de diferencia son los eventos cuya VIP
  cuesta 50 000. Es la misma trampa del Paso 8 del Lab 3 (vender en la zona equivocada).
- **A3:** por qué `etiquetas: "accesible"` funciona sin `$in` ni `$elemMatch` (igualdad contra un arreglo).
- **A4:** `$exists: false` contra `patrocinador: null` (aquí dan lo mismo porque el generador nunca escribe `null`;
  digan qué pasaría si lo hiciera).
- Proyecciones mínimas: solo los campos que pide cada pregunta.

```bash
log 5 "A2 (195 vs 265), A3 (91), A4 (275)" OK    # en HOST
```

> Un commit por consulta (A2, comparación, A3, A4) en su rama.

---

## Paso 6 — A5 y Parte B · Responsable: C

**A5** — pegue en su bloque de `consultas.js` (entre los comentarios `Persona C`):

```javascript
// A5 — capacidad total por ciudad: una fila por zona ($unwind), suma por ciudad, de mayor a menor
print("== A5 ==");
db.eventos.aggregate([
  { $unwind: "$zonas" },
  { $group: { _id: "$ciudad", capacidad_total: { $sum: "$zonas.capacidad" } } },
  { $sort: { capacidad_total: -1 } },
]).forEach(printjson);
```

Esperado: 8 ciudades, **Heredia 30 380** primero y Cartago 15 550 último. Control: la suma de las 8 es **162 810**,
igual al `capacidad_total` del manifiesto. Informe: qué hace `$unwind` con un evento de 3 zonas (3 documentos).

**Parte B** — archivo `labs/lab3-mongo-replicas/tarea/parte_b.js`, salida a `evidence/tarea3/parte-b.txt`:

```bash
docker exec -i ti4601-tarea3 mongosh --quiet boleteria --file /dev/stdin \
  < labs/lab3-mongo-replicas/tarea/parte_b.js | tee evidence/tarea3/parte-b.txt
```

Qué debe medir (`print("== B1 ==")` + `printjson(...)`, mismas reglas de script):

1. `bsonsize()` de una orden con `_id`, `evento_id`, `zona`, `cantidad`, `estado` y `creada_en` (`new Date(...)`).
2. `bsonsize()` de un evento real sin órdenes (`db.eventos.findOne({ _id: "EV-0001" })`).
3. Cuántas órdenes caben: `(16 MiB − evento) / costo por orden`. **Ojo:** dentro de un arreglo cada elemento paga
   además su índice como string (`"0"`, `"1"`, …, `"130000"`) y un byte de tipo. Compruébelo midiendo un evento con
   1 000 órdenes embebidas y dividiendo la diferencia entre 1 000.

Puntos para la media página (con números de `parte-b.txt`):
- **B.2 concurrencia:** MongoDB serializa las escrituras sobre **un mismo documento** (conflictos de escritura en
  WiredTiger, reintentos). Cientos de compradores sobre un evento = documento caliente. Ventaja de un documento: la
  compra y el stock se actualizan de forma atómica sin transacción. Desventaja: contención, documento que crece
  sin límite y pesa en cada lectura del evento, límite de 16 MB.
- **B.3 regla:** una o dos oraciones (p. ej. anidar lo que se lee junto, pertenece a un solo padre y está
  **acotado**; referenciar lo que crece sin límite, se escribe en paralelo o se consulta por separado) aplicada a
  un dominio que **no** sea la boletería ni el Proyecto 2.

```bash
log 6 "A5 (162810) + parte_b.js" OK    # en HOST
```

> Commits de A5 y de `parte_b.js` + `parte-b.txt` en su rama.

---

## Paso 7 — Ejecución final y PDF · Responsable: A · pendiente: espera a B y C

Con las ramas de B y C ya fusionadas en `main`:

```bash
set -o pipefail
docker exec -i ti4601-tarea3 mongosh --quiet boleteria --file /dev/stdin \
  < labs/lab3-mongo-replicas/tarea/consultas.js | tee evidence/tarea3/consultas.txt
grep -c '^== A' evidence/tarea3/consultas.txt     # encabezados A1–A5 + explain/comparación
log 7 "consultas.js completo" OK
```

Revisar que no falte evidencia (**HOST**):

```bash
cd evidence/tarea3 && for f in comandos.md datos-manifest.txt import.txt consultas.txt \
  indice-orden.txt parte-b.txt; do test -s "$f" || echo "FALTA: $f"; done; cd -
grep -n '\\falta{' labs/lab3-mongo-replicas/tarea/INFORME.tex   # no debe imprimir nada
```

Compilar el PDF (cualquier `pdflatex` sirve; también Overleaf):

```bash
cd labs/lab3-mongo-replicas/tarea && pdflatex INFORME.tex && pdflatex INFORME.tex
```

---

## Entregable

### En el repositorio

```text
labs/lab3-mongo-replicas/tarea/consultas.js      (A1–A5 + índice + comparación de A2)
labs/lab3-mongo-replicas/tarea/orden_indice.js   (respaldo del orden del índice)
labs/lab3-mongo-replicas/tarea/parte_b.js        (bsonsize de la Parte B)
labs/lab3-mongo-replicas/tarea/INFORME.tex
evidence/tarea3/comandos.md        datos-manifest.txt      import.txt
evidence/tarea3/consultas.txt      indice-orden.txt        parte-b.txt
```

### PDF (máx. 2 páginas)

- **Pág. 1:** A1–A5 (consulta + resultado resumido), `explain` antes/después con las cuatro métricas y el orden de
  campos justificado (A); comparación de A2 con los dos números (B).
- **Pág. 2:** Parte B en media página (C) y, si sobra espacio, resultados de A4/A5.

### Lista de control final

- [ ] `consultas.js` corre completo con el comando del enunciado (sin `use` ni `show`)
- [ ] Cada consulta tiene su `print("== Ax ==")` y proyecciones mínimas
- [x] `explain` antes (`COLLSCAN`) y después (`IXSCAN`) con `totalDocsExamined`, `totalKeysExamined`, `nReturned` y etapa — hecho en `8af87c7`
- [x] Orden de los campos del índice justificado — hecho en `c8599f4` + sección A1 de `INFORME.tex`
- [ ] A2: 195 contra 265 explicado
- [ ] Parte B con `bsonsize()` y cifras que salen de `parte-b.txt`
- [ ] Cada cifra del PDF sale de un archivo de `evidence/tarea3/`
- [ ] PDF de 2 páginas como máximo, con el enlace al repo
- [ ] Commits de los 3 integrantes, repartidos en la semana

---

## Errores comunes (atajos)

| Síntoma | Acción |
| --- | --- |
| `Conflict. The container name "/ti4601-tarea3" is already in use` | ya existe: `docker start ti4601-tarea3` |
| `No such container: ti4601-tarea3` | falta `docker run -d --name ti4601-tarea3 mongo:8.0` |
| `error getting credentials ... desktop.exe: exec format error` (WSL) | `export DOCKER_CONFIG=$(mktemp -d); echo '{}' > $DOCKER_CONFIG/config.json` y repetir |
| `consultas.txt` sale **vacío** y sin error (exit 0) | el script tiene `use` o `show`: quítelos, la base va en el comando (`boleteria`) |
| `eventos.jsonl: No such file` | falta `generar_datos.py` (Paso 1); `data/` no se versiona |
| el "antes" del `explain` sale con `IXSCAN` | el índice ya existía: el bloque A1 debe borrarlo antes de medir |
| conteos distintos a los esperados | compare el `sha256` del manifiesto; vuelva a importar con `--drop` |

Borrar el contenedor al terminar la tarea: `docker rm -f ti4601-tarea3`.
