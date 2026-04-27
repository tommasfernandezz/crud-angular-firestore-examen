# CRUD Firestore Examen Base

Proyecto base para examen de CRUD con Angular + Bootstrap + Firebase/Firestore.

## Pasos previos

1. Instalar dependencias:

```bash
npm install
```

2. Pegar las credenciales de Firebase en:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

3. Activar Firestore en Firebase Console.

4. Crear una colección llamada:

```text
products
```

5. Ejecutar:

```bash
npm start
```

## Qué incluye

- Bootstrap vinculado en angular.json.
- Firebase inicializado en app.config.ts.
- Firestore conectado.
- Servicio CRUD completo.
- Versión con Template-Driven Forms.
- Versión con Reactive Forms.
- Validaciones básicas.

## Adaptación rápida al examen

Si el enunciado pide `alumnos`, cambia:

- Product -> Student/Alumno
- products -> students/alumnos
- Campos del modelo
- Inputs del formulario
- Columnas de la tabla

No cambies la lógica CRUD salvo que el enunciado lo exija.

## Entrega

Antes de comprimir, borra:

```text
node_modules
```

Luego comprime la carpeta limpia en .zip o .rar.
