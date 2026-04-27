Te dejo un `README_EXAMEN.md` preparado para pegarlo directamente en la rama `plantilla-examen`. Está pensado como **chuleta operativa**: qué archivos tocar, qué nombres cambiar y qué no tocar.

````md
# Plantilla CRUD Angular + Firebase/Firestore

Proyecto base preparado para examen de CRUD con:

- Angular
- Bootstrap
- Firebase
- Firestore
- Servicio CRUD patrón
- Formulario Template-Driven
- Formulario Reactive Forms
- Validaciones básicas

---

# 1. Qué NO tocar si ya funciona

Estos archivos forman parte de la configuración base del proyecto. Si Firebase y Angular ya funcionan, no tocarlos salvo necesidad clara.


src/environments/environment.ts
src/environments/environment.prod.ts
src/app/app.config.ts
src/main.ts
angular.json
package.json
firebase.json


````

## Archivos importantes

### `environment.ts`

Contiene las credenciales de Firebase.

```ts
environment.firebase
```

### `app.config.ts`

Inicializa Firebase, Firestore y las rutas.

```ts
provideFirebaseApp(() => initializeApp(environment.firebase))
provideFirestore(() => getFirestore())
```

### `angular.json`

Tiene Bootstrap enlazado.

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

---

# 2. Qué suele cambiar en el examen

Normalmente el examen cambiará la entidad.

Ejemplos:

```text
Product  → Alumno
products → alumnos

Product  → Libro
products → libros

Product  → Reserva
products → reservas

Product  → Tarea
products → tareas
```

Los campos también cambiarán.

Ejemplo actual:

```ts
export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  active: boolean;
}
```

Ejemplo si cae `Alumno`:

```ts
export interface Alumno {
  id?: string;
  nombre: string;
  email: string;
  edad: number;
  curso: string;
  activo: boolean;
}
```

---

# 3. Archivos que normalmente hay que modificar

## Modelo

Archivo actual:

```text
src/app/models/product.model.ts
```

Aquí se define la forma del objeto.

Ejemplo:

```ts
export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  active: boolean;
}
```

Si el examen pide otra entidad, cambiar:

```text
Product → NuevaEntidad
Campos → campos del enunciado
```

Ejemplo:

```ts
export interface Libro {
  id?: string;
  titulo: string;
  autor: string;
  genero: string;
  precio: number;
  disponible: boolean;
}
```

---

## Servicio

Archivo actual:

```text
src/app/services/product.service.ts
```

Este archivo habla con Firestore.

Buscar la colección:

```ts
collection(this.firestore, 'products')
```

Cambiar `products` por la colección del examen:

```ts
collection(this.firestore, 'alumnos')
```

o:

```ts
collection(this.firestore, 'libros')
```

Métodos importantes:

```ts
getAll()
create()
update()
delete()
```

Patrón CRUD:

```ts
getAll() {
  return collectionData(this.collectionRef, { idField: 'id' });
}
```

```ts
create(item: Tipo) {
  return addDoc(this.collectionRef, item);
}
```

```ts
update(id: string, item: Tipo) {
  const docRef = doc(this.firestore, `coleccion/${id}`);
  return updateDoc(docRef, { ...item });
}
```

```ts
delete(id: string) {
  const docRef = doc(this.firestore, `coleccion/${id}`);
  return deleteDoc(docRef);
}
```

Importante: en `update` y `delete`, la ruta debe coincidir con la colección.

Ejemplo:

```ts
const docRef = doc(this.firestore, `products/${id}`);
```

Si cambia a alumnos:

```ts
const docRef = doc(this.firestore, `alumnos/${id}`);
```

---

# 4. Campos que hay que cambiar en el componente Template-Driven

Archivo:

```text
src/app/components/products-template/products-template.component.ts
```

Partes que suelen cambiar:

## 1. Import del modelo

Actual:

```ts
import { Product } from '../../models/product.model';
```

Si cambia la entidad:

```ts
import { Alumno } from '../../models/alumno.model';
```

---

## 2. Nombre del servicio

Actual:

```ts
import { ProductService } from '../../services/product.service';
```

Si se crea otro servicio:

```ts
import { AlumnoService } from '../../services/alumno.service';
```

---

## 3. Lista de datos

Actual:

```ts
products$ = this.productService.getAll();
```

Puede cambiar a:

```ts
alumnos$ = this.alumnoService.getAll();
```

---

## 4. Objeto del formulario

Actual:

```ts
product: Product = this.getEmptyProduct();
```

Puede cambiar a:

```ts
alumno: Alumno = this.getEmptyAlumno();
```

---

## 5. Objeto vacío

Actual:

```ts
private getEmptyProduct(): Product {
  return {
    name: '',
    price: 0,
    category: '',
    stock: 0,
    active: true
  };
}
```

Ejemplo para alumnos:

```ts
private getEmptyAlumno(): Alumno {
  return {
    nombre: '',
    email: '',
    edad: 0,
    curso: '',
    activo: true
  };
}
```

---

## 6. Conversión de números

Actual:

```ts
this.product.price = Number(this.product.price);
this.product.stock = Number(this.product.stock);
```

Si la entidad tiene números, convertirlos.

Ejemplo:

```ts
this.alumno.edad = Number(this.alumno.edad);
```

Si no hay campos numéricos, eliminar esas líneas.

---

# 5. Campos que hay que cambiar en el HTML Template-Driven

Archivo:

```text
src/app/components/products-template/products-template.component.html
```

## Inputs

Actual:

```html
<input
  class="form-control"
  [(ngModel)]="product.name"
  name="name"
  required>
```

Si cae alumno:

```html
<input
  class="form-control"
  [(ngModel)]="alumno.nombre"
  name="nombre"
  required>
```

---

## Campo email

Si el enunciado pide email:

```html
<input
  type="email"
  class="form-control"
  [(ngModel)]="alumno.email"
  name="email"
  required
  email>
```

---

## Campo numérico

```html
<input
  type="number"
  class="form-control"
  [(ngModel)]="alumno.edad"
  name="edad"
  required
  min="1">
```

---

## Campo checkbox

```html
<input
  type="checkbox"
  class="form-check-input"
  [(ngModel)]="alumno.activo"
  name="activo">
```

---

## Tabla

Actual:

```html
<tr *ngFor="let product of products$ | async">
  <td>{{ product.name }}</td>
  <td>{{ product.price }}</td>
  <td>{{ product.category }}</td>
  <td>{{ product.stock }}</td>
  <td>{{ product.active ? 'Sí' : 'No' }}</td>
</tr>
```

Ejemplo alumnos:

```html
<tr *ngFor="let alumno of alumnos$ | async">
  <td>{{ alumno.nombre }}</td>
  <td>{{ alumno.email }}</td>
  <td>{{ alumno.edad }}</td>
  <td>{{ alumno.curso }}</td>
  <td>{{ alumno.activo ? 'Sí' : 'No' }}</td>
</tr>
```

---

# 6. Validaciones Template-Driven

Para usar validaciones, el formulario debe tener referencia:

```html
<form #form="ngForm" (ngSubmit)="save(form)">
```

## Required

```html
<input
  class="form-control"
  [(ngModel)]="product.name"
  name="name"
  required
  #name="ngModel">

<div class="text-danger" *ngIf="name.invalid && name.touched">
  El nombre es obligatorio.
</div>
```

## Minlength

```html
<input
  class="form-control"
  [(ngModel)]="product.name"
  name="name"
  required
  minlength="3"
  #name="ngModel">

<div class="text-danger" *ngIf="name.errors?.['minlength'] && name.touched">
  Debe tener al menos 3 caracteres.
</div>
```

## Email

```html
<input
  type="email"
  class="form-control"
  [(ngModel)]="alumno.email"
  name="email"
  required
  email
  #email="ngModel">

<div class="text-danger" *ngIf="email.invalid && email.touched">
  Introduce un email válido.
</div>
```

## Number mínimo

```html
<input
  type="number"
  class="form-control"
  [(ngModel)]="product.price"
  name="price"
  required
  min="1"
  #price="ngModel">

<div class="text-danger" *ngIf="price.invalid && price.touched">
  El valor debe ser mayor que 0.
</div>
```

## Botón deshabilitado si el formulario es inválido

```html
<button
  class="btn btn-primary"
  type="submit"
  [disabled]="form.invalid">
  Guardar
</button>
```

---

# 7. Campos que hay que cambiar en Reactive Forms

Archivo:

```text
src/app/components/products-reactive/products-reactive.component.ts
```

## FormGroup

Actual:

```ts
form = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  price: new FormControl(0, [Validators.required, Validators.min(1)]),
  category: new FormControl('', Validators.required),
  stock: new FormControl(0, [Validators.required, Validators.min(0)]),
  active: new FormControl(true)
});
```

Ejemplo alumno:

```ts
form = new FormGroup({
  nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  edad: new FormControl(0, [Validators.required, Validators.min(1)]),
  curso: new FormControl('', Validators.required),
  activo: new FormControl(true)
});
```

---

## Guardar objeto

Actual:

```ts
const product = this.form.getRawValue() as Product;
```

Ejemplo alumno:

```ts
const alumno = this.form.getRawValue() as Alumno;
```

---

## Editar

Actual:

```ts
this.form.patchValue(product);
```

Ejemplo:

```ts
this.form.patchValue(alumno);
```

---

## Resetear

Actual:

```ts
this.form.reset({
  name: '',
  price: 0,
  category: '',
  stock: 0,
  active: true
});
```

Ejemplo alumno:

```ts
this.form.reset({
  nombre: '',
  email: '',
  edad: 0,
  curso: '',
  activo: true
});
```

---

# 8. HTML Reactive Forms

Archivo:

```text
src/app/components/products-reactive/products-reactive.component.html
```

El formulario debe tener:

```html
<form [formGroup]="form" (ngSubmit)="save()">
```

Input:

```html
<input class="form-control" formControlName="name">
```

Ejemplo alumno:

```html
<input class="form-control" formControlName="nombre">
```

Email:

```html
<input type="email" class="form-control" formControlName="email">
```

Número:

```html
<input type="number" class="form-control" formControlName="edad">
```

Checkbox:

```html
<input type="checkbox" class="form-check-input" formControlName="activo">
```

Botón:

```html
<button class="btn btn-primary" type="submit" [disabled]="form.invalid">
  Guardar
</button>
```

---

# 9. Checklist rápido para adaptar el CRUD

Cuando llegue el enunciado, seguir este orden:

```text
1. Leer la entidad y los campos.
2. Crear/adaptar la interface.
3. Cambiar la colección en el servicio.
4. Cambiar nombres de variables si hace falta.
5. Cambiar getEmptyProduct() o reset().
6. Cambiar inputs del formulario.
7. Cambiar columnas de la tabla.
8. Cambiar validaciones.
9. Probar crear.
10. Probar leer.
11. Probar editar.
12. Probar borrar.
13. Comprobar en Firebase.
14. Comprimir sin node_modules.
```

---

# 10. Ejemplo rápido: de Product a Alumno

## Modelo

```ts
export interface Alumno {
  id?: string;
  nombre: string;
  email: string;
  edad: number;
  curso: string;
  activo: boolean;
}
```

## Colección Firestore

```ts
collection(this.firestore, 'alumnos')
```

## Objeto vacío

```ts
private getEmptyAlumno(): Alumno {
  return {
    nombre: '',
    email: '',
    edad: 0,
    curso: '',
    activo: true
  };
}
```

## Conversión numérica

```ts
this.alumno.edad = Number(this.alumno.edad);
```

## HTML

```html
<input [(ngModel)]="alumno.nombre" name="nombre" required>
<input type="email" [(ngModel)]="alumno.email" name="email" required email>
<input type="number" [(ngModel)]="alumno.edad" name="edad" required min="1">
<input [(ngModel)]="alumno.curso" name="curso" required>
<input type="checkbox" [(ngModel)]="alumno.activo" name="activo">
```

---

# 11. Entrega

Antes de entregar, comprobar:

```bash
ng serve
```

Si funciona, parar servidor:

```bash
Ctrl + C
```

No incluir:

```text
node_modules/
```

Comprimir la carpeta del proyecto sin `node_modules`.

Archivos que sí deben ir:

```text
src/
angular.json
package.json
package-lock.json
tsconfig.json
tsconfig.app.json
firebase.json
README_EXAMEN.md
```

---

# 12. Comandos útiles

## Instalar dependencias al recuperar el proyecto

```bash
npm install
```

## Arrancar Angular

```bash
ng serve
```

## Ver rama actual

```bash
git branch
```

## Guardar cambios

```bash
git add .
git commit -m "Adapta plantilla CRUD a entidad del examen"
```

## Subir cambios

```bash
git push
```

````

Mi consejo: en la rama `plantilla-examen`, sustituye el contenido actual de `README_EXAMEN.md` por este. Luego guarda con:

```bash
git add README_EXAMEN.md
git commit -m "Añade guía de adaptación para examen CRUD"
git push
````
