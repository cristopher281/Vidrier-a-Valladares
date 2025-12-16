import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminSidebar(){
  const items = [
    {to:'/admin',label:'Dashboard',icon:'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'},
    {to:'/admin/products',label:'Productos',icon:'M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2z'},
    {to:'/admin/inventory',label:'Inventario',icon:'M3 13h2v-2H3v2zm0 4h2v-2H3v2zM7 9h14v10H7V9zM5 11h2V9H5v2z'},
    {to:'/admin/config',label:'Configuración',icon:'M12 8a4 4 0 100 8 4 4 0 000-8z'}
  ]

  return (
    <aside className="admin-sidebar" style={{width:260,height:'100vh'}}>
      <div style={{fontWeight:800,marginBottom:14,color:'white',fontSize:18}}>Vidriería Valladares</div>
      <nav style={{display:'flex',flexDirection:'column',gap:8}}>
        {items.map(i=> (
          <NavLink key={i.to} to={i.to} end={i.to==='/admin'} className={({isActive})=> `sidebar-item ${isActive? 'active':''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{opacity:0.95}}>
              <path d={i.icon}></path>
            </svg>
            <span style={{fontWeight:600}}>{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
