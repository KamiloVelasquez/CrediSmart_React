
#  CreditSmart – Cooperativa Financiera Digital
**Versión:** v1.0
**Desarrollado por:** Juan Camilo Velásquez Yepes
**Institución:** IU Digital de Antioquia
**Proyecto:** Actividad 1 – Diseño de Interfaces Web
**Tecnología:** React.js

>>>> Repositorio GitHub: https://github.com/KamiloVelasquez/CrediSmart_React.git

---

## Descripción del Proyecto

**CreditSmart** es una aplicación web moderna construida con **React.js**, diseñada para ayudar a los usuarios a entender y gestionar sus finanzas personales dentro de una cooperativa digital. A través de una interfaz intuitiva y responsiva, los usuarios pueden explorar opciones de créditos, ahorros e inversiones, recibir asesoría financiera y tomar decisiones más informadas.

Este proyecto fue desarrollado como parte de la **Actividad 2** de la asignatura *Desarrollo de Aplicación Web Dinámica con React - CreditSmart*, aplicando principios de UX/UI, componentización, y diseño responsive con React.

---

## Características Principales

- **Créditos:** Solicita préstamos y visualiza simuladores personalizados.
- **Ahorros & Inversiones:** Explora productos financieros educativos.
- **Asesoría:** Página “Nosotros” con información sobre el equipo y servicios.
- **Diseño Responsivo:** Adaptado a móviles, tablets y escritorio.
- **Componentes Reutilizables:** Estructura modular con componentes como `Navbar`, `Footer`, `CreditCard`, etc.
- **Seguridad y Confianza:** Interfaz limpia, profesional y centrada en la experiencia del usuario.

---

## Capturas de Pantalla

### Vista de Escritorio
![Página principal](/creditsmart-app/src/assets/images/pantallazo_1.png)
![Página busqueda y credito](/creditsmart-app/src/assets/images/pantallazo_2.png)
![Página busqueda filtrada](/creditsmart-app/src/assets/images/pantallazo_3.png)
![Página modal_1](/creditsmart-app/src/assets/images/pantallazo_4.png)
![Página modal_2](/creditsmart-app/src/assets/images/pantallazo_5.png)

### Vista Móvil (Responsive)
![Página responsiva_1](/creditsmart-app/src/assets/images/pantallazo_6.png)
![Página responsiva_1](/creditsmart-app/src/assets/images/pantallazo_7.png)

> **Diseño completamente responsivo**, compatible con dispositivos móviles, tabletas y escritorio.

---

## Tecnologías Utilizadas

- **React.js** (v18+) — Biblioteca para interfaces de usuario.
- **JSX** — Sintaxis para escribir componentes.
- **CSS Modules / CSS Global** — Estilos personalizados y reutilizables.
- **Componentes Funcionales + Hooks** — Arquitectura moderna de React.
- **Rutas Simples (sin react-router)** — Navegación mediante importación directa de páginas.
- **Imágenes y Assets** — Organizados en `/src/assets/images/`.
- **Eslint + Vite** — Configurados para desarrollo y calidad de código.

---

## Estructura del Proyecto

CREDITSMART_REACT/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── CreditCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GreenBanner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   └── images/
│   │       ├── consumo.png
│   │       ├── Credito_Educativo.png
│   │       ├── Credito_Libre_Inversion.png
│   │       ├── Credito_Vehiculo.png
│   │       ├── Credito_Vivienda.png
│   │       ├── educativo.png
│   │       ├── empresarial.png
│   │       ├── libre.png
│   │       ├── logo_CreditSmart.png
│   │       ├── targeta_credito_1.png
│   │       ├── targeta_credito_2.png
│   │       ├── vehiculo.png
│   │       └── vivienda.png
│   │   └── react.svg
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Simulador.jsx
│   │   └── Solicitar.jsx
│   │
│   ├── data/
│   │   └── App.css
│   │   └── App.jsx
│   │   └── index.css
│   │   └── main.jsx
│   │   └── styles.css
│   │
│   └── index.js (o main.jsx si usas Vite)
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── tsconfig.json (si aplica)


> **Nota:** El proyecto utiliza **Vite** como herramienta de construcción (según `vite.config.js` y `package.json`), lo cual permite un desarrollo rápido y eficiente.

---

## Cómo Ejecutar el Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/KamiloVelasquez/CrediSmart_React.git
   cd CrediSmart_React
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en: `http://localhost:5173`

---

## Licencia

Este proyecto es de uso educativo y fue desarrollado como parte de las actividades académicas de la **IU Digital de Antioquia**. Todos los derechos reservados © 2025 Juan Camilo Velásquez Yepes.

---
