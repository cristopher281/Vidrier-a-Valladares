import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import Dashboard from '../components/admin/Dashboard'
import InventoryTable from '../components/admin/InventoryTable'
import RawMaterialsTable from '../components/admin/RawMaterialsTable'
import { useProducts } from '../context/ProductContext'

function Login({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (user === 'admin' && pass === 'admin') {
      localStorage.setItem('vv_auth', '1')
      onLogin()
    } else {
      setError('Credenciales inválidas. Usa: admin/admin')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        <div className="login-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
        </div>
        <h3>Administración</h3>
        <p className="subtitle">Vidriería Valladares</p>
        <form onSubmit={submit} style={{ display: 'grid', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input
              className="input"
              placeholder="admin"
              value={user}
              onChange={e => setUser(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              className="input"
              placeholder="••••••"
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          {error && <div style={{ color: '#ff6b6b', fontSize: 14, textAlign: 'center' }}>{error}</div>}
          <button className="btn btn-large" type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  )
}

export default function Admin() {
  const [auth, setAuth] = useState(!!localStorage.getItem('vv_auth'))
  const { products } = useProducts()
  const nav = useNavigate()

  const logout = () => {
    localStorage.removeItem('vv_auth')
    setAuth(false)
    nav('/')
  }

  if (!auth) return <Login onLogin={() => setAuth(true)} />

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header fade-in">
          <h1>Administración</h1>
          <div className="admin-actions">
            <button className="btn-tertiary" onClick={() => nav('/')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Ver Tienda
            </button>
            <button className="btn-secondary" onClick={logout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<InventoryTable />} />
          <Route path="inventory" element={<InventoryTable />} />
          <Route path="materials" element={<RawMaterialsTable />} />
          <Route path="config" element={<div className="card fade-in">Configuración del sitio (próximamente)</div>} />
        </Routes>

      </main>
    </div>
  )
}
