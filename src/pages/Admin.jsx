import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import Dashboard from '../components/admin/Dashboard'
import InventoryTable from '../components/admin/InventoryTable'
import { useProducts } from '../context/ProductContext'

function Login({onLogin}){
  const [user,setUser] = useState('')
  const [pass,setPass] = useState('')
  const submit = (e)=>{e.preventDefault(); if(user==='admin' && pass==='admin'){ localStorage.setItem('vv_auth','1'); onLogin(); } else alert('Credenciales inválidas (admin/admin)') }
  return (
    <div className="card" style={{maxWidth:480,margin:'6rem auto'}}>
      <div className="fade-in" style={{padding:'2rem'}}>
        <h3 style={{marginBottom:8}}>Acceso Administrador</h3>
        <p style={{color:'var(--muted)',marginTop:0}}>Ingresa tus credenciales para continuar</p>
        <form onSubmit={submit} style={{marginTop:12}}>
          <div className="form-group floating">
            <input className="input" placeholder=" " value={user} onChange={e=>setUser(e.target.value)} />
            <label className="form-label">Usuario</label>
          </div>
          <div className="form-group floating">
            <input className="input" placeholder=" " type="password" value={pass} onChange={e=>setPass(e.target.value)} />
            <label className="form-label">Contraseña</label>
          </div>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button className="btn" type="submit">Entrar</button>
            <button type="button" className="btn-secondary" onClick={()=>{setUser('');setPass('')}}>Limpiar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Admin(){
  const [auth, setAuth] = useState(!!localStorage.getItem('vv_auth'))
  const { products } = useProducts()
  const nav = useNavigate()

  const logout = ()=>{ localStorage.removeItem('vv_auth'); setAuth(false); nav('/') }

  if(!auth) return <Login onLogin={()=>setAuth(true)} />

  return (
    <div style={{display:'flex'}}>
      <AdminSidebar />
      <main style={{flex:1,padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <h1 style={{margin:0}}>Administración</h1>
            <p style={{margin:0,color:'var(--muted)'}}>Panel de control — Vidriería Valladares</p>
          </div>
          <div>
            <button className="btn-secondary" onClick={()=>window.location.href='/'} style={{marginRight:8}}>Ver Tienda Pública</button>
            <button className="btn-secondary" onClick={logout}>Cerrar sesión</button>
          </div>
        </div>

        <div style={{marginTop:18}}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<InventoryTable />} />
            <Route path="inventory" element={<InventoryTable />} />
            <Route path="config" element={<div className="card">Configuración del sitio (próximamente)</div>} />
          </Routes>
        </div>

      </main>
    </div>
  )
}
