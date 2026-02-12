# 🛒 React Cart - Context API + TypeScript

Aplicación de carrito de compras desarrollada con **React + TypeScript**, utilizando **Context API + useReducer** para el manejo de estado global y **localStorage** para persistencia de datos.

---

## 🚀 Features

* ✅ Agregar productos al carrito
* ✅ Incrementar / Decrementar cantidad
* ✅ Eliminar productos
* ✅ Vaciar carrito
* ✅ Persistencia con localStorage
* ✅ Manejo de estado global con Context API
* ✅ Arquitectura escalable
* ✅ Código tipado con TypeScript

---

## 🛠️ Tecnologías

* React
* TypeScript
* Context API
* useReducer
* localStorage
* Vite 

---

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/KEPLERMH/tech-store.git
```

Instala dependencias:

```bash
npm install
```

Ejecuta el proyecto:

```bash
npm run dev
```

---

## 🧠 Arquitectura

El proyecto utiliza:

* **Context API** para exponer el estado global del carrito.
* **useReducer** para manejar la lógica de actualización.
* **Custom Hook (`useCart`)** para encapsular el consumo del contexto.
* **Persistencia con localStorage** mediante `useEffect`.

Flujo de datos:

```
Component → dispatch(action) → reducer → new state → Context → Components
```

---


## 🔄 Acciones del Reducer

* `ADD_TO_CART`
* `REMOVE_FROM_CART`
* `INCREMENT`
* `DECREMENT`
* `EMPTY`

---

## 💾 Persistencia

El estado del carrito se guarda automáticamente en `localStorage` y se restaura al recargar la página.

---

## 📈 Posibles mejoras futuras

* Persistencia en backend
* Autenticación de usuario
* Sincronización entre pestañas
* Optimización con memoización avanzada
* Testing con Jest / React Testing Library
* Migración a Zustand o Redux Toolkit

---

## 👨‍💻 Autor

Kepler Matos Desarrollado como proyecto de práctica para mejorar manejo de estado global y arquitectura en React.

