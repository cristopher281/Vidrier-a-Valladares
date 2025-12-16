import React, { useState } from 'react'
import { useProducts } from '../../context/ProductContext'
import ProductForm from './ProductForm'

export default function InventoryTable(){
  const { products, deleteProduct, updateProduct, addProduct } = useProducts()
  const [editing, setEditing] = useState(null)

  const save = (p) => {
    if(p.id) updateProduct(p.id, p)
    else addProduct(p)
    setEditing(null)
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3>Inventario</h3>
        <button className="btn" onClick={()=>setEditing({})}>Nuevo Producto</button>
      </div>
      {editing && <div className="card" style={{margin:'1rem 0'}}><ProductForm initial={editing} onSave={save} onCancel={()=>setEditing(null)} /></div>}

      <div className="table-wrap card" style={{marginTop:12}}>
        <div className="inventory-header" style={{display:'grid',gridTemplateColumns:'72px 1fr 140px 140px 120px',gap:12,padding:12}}>
          <div>Imagen</div>
          <div>Producto</div>
          <div>Precio</div>
          <div>Stock</div>
          <div>Acciones</div>
        </div>
        <div>
          {products.map(p=> (
            <div key={p.id} className="inventory-row">
              <div className="cell">
                <div className="thumb-wrap">
                  <img className="thumb" src={p.img||'https://via.placeholder.com/80'} alt="" />
                  <div className="thumb-overlay"><small style={{color:'white',fontSize:12}}>Ver</small></div>
                </div>
              </div>
              <div className="cell">
                <div style={{fontWeight:700}}>{p.name}</div>
                <div style={{fontSize:13,color:'var(--muted)'}}>{p.category || ''}</div>
              </div>
              <div className="cell">${p.price}</div>
              <div className="cell">{p.stock} {p.stock<10 ? <span className="badge low" style={{marginLeft:8}}>Bajo</span> : <span className="badge ok" style={{marginLeft:8}}>OK</span>}</div>
              <div className="cell">
                <button className="btn btn-icon" onClick={()=>setEditing(p)} style={{marginRight:8}}>✏️ Editar</button>
                <button className="btn-secondary btn-icon" onClick={()=>deleteProduct(p.id)}>🗑 Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
