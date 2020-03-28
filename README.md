# Manejo de sesiones

## Requerimientos

El sistema depende de que tengas [Knex.js](http://knexjs.org/) instalado de forma global.

```bash
npm i knex -g
```

## Instalación

1. Guarda el archivo .env.example como .env y modifica las variables para que coincidan con tu ambiente

```bash
cp .env.example .env
```

2. Instala los paquetes indicados en el `package.json`

```bash
npm install
```

3. Ejecuta las migraciones

```bash
knex migrate:latest
```

4. Ejecuta el servidor de Node.js

```bash
node server.js
```
