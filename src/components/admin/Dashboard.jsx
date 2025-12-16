import React from 'react'
import { useProducts } from '../../context/ProductContext'

export default function Dashboard(){
  const { products, lowStock } = useProducts()
  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12,marginTop:12}}>
        <div className="metric-card">
          <div className="metric-icon" style={{background:'linear-gradient(90deg,var(--primary),var(--accent))'}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zM7 9h14v10H7V9zM5 11h2V9H5v2z"></path></svg>
          </div>
          <div>
            <div style={{fontSize:13,color:'var(--muted)'}}>Total productos</div>
            <div style={{fontSize:22,fontWeight:800}}>{products.length}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{background:'linear-gradient(90deg,#ff9aa2,#ff6a6a)'}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
          </div>
          <div>
            <div style={{fontSize:13,color:'var(--muted)'}}>Productos con bajo stock</div>
            <div style={{fontSize:22,fontWeight:800,color: lowStock.length? '#ffb74d':'#7ee787'}}>{lowStock.length}</div>
          </div>
        </div>

      </div>
    </div>
  )
}
