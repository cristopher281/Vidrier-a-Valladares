import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Admin from './pages/Admin'
import About from './pages/About'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import WoodProducts from './pages/WoodProducts'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/wood-products" element={<WoodProducts />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<div style={{ padding: 20 }}>Página no encontrada — <Link to="/">Ir a inicio</Link></div>} />
    </Routes>
  )
}

