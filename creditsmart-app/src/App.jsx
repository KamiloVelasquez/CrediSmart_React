import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import Home from './assets/pages/Home'
import Simulador from './assets/pages/Simulador'
import Nosotros from './assets/pages/Nosotros'
import Solicitar from './assets/pages/Solicitar'

export default function App(){
  return (
    <>
      {/*
        App principal
        - `Navbar` y `Footer` son fijos
        - `Routes` cambia la vista principal según la URL
        Comentarios: mantengo la estructura limpia para que el enrutamiento funcione.
      */}
      <Navbar />
      <main className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/solicitar" element={<Solicitar />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
