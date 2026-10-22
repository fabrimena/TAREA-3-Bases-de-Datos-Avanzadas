# Registro de comandos — Tarea 3

- 2026-10-22 13:54:48 · Paso 1 · `make build` · OK
- 2026-10-22 13:54:49 · Paso 1 · `docker run -d --name ti4601-tarea3 mongo:8.0 (MongoDB 8.0.34)` · OK
- 2026-10-22 13:54:50 · Paso 1 · `generar_datos.py (400 eventos, sha256 9fc6a2db…)` · OK
- 2026-10-22 13:54:50 · Paso 1 · `mongoimport --drop (400 documentos)` · OK
- 2026-10-22 13:55:42 · Paso 3 · `consultas.js: A1 (7 eventos), explain COLLSCAN 400 docs -> IXSCAN 7/7/7` · OK
- 2026-10-22 13:56:06 · Paso 3 · `orden_indice.js: claves examinadas 7 (propuesto) / 30 / 90 / 31` · OK
