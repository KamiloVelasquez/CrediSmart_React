import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {/* Usamos la ruta dentro de `src/assets/IMAGES` donde están los logos */}
          <img src="/src/assets/IMAGES/logo_CreditSmart.png" alt="Logo" height="60" className="me-3" />
          <span className="text-creditsmart fw-bold">CreditSmart</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Catálogo</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/simulador">Simulador</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
          </ul>
          <Link className="btn btn-success" to="/solicitar">Solicitar Crédito</Link>
        </div>
      </div>
    </nav>
  )
}
