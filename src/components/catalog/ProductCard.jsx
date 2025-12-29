import React from 'react'

export default function ProductCard({ product, onDetailsClick }) {
  return (
    <div className="card">
      <img
        className="product-img"
        src={product.img ? product.img.split('/').map(part => encodeURIComponent(part)).join('/') : 'https://via.placeholder.com/400x300?text=Vidrio'}
        alt={product.name}
      />
      <h4>{product.name}</h4>
      <p style={{ color: '#475569' }}>{product.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <div>
          <div style={{ fontWeight: 700 }}>${product.price}</div>
          <div style={{ color: product.stock > 10 ? '#16a34a' : product.stock > 0 ? '#f59e0b' : '#ef4444' }}>{product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}</div>
        </div>
        <button className="btn" onClick={() => onDetailsClick(product)}>Ver detalles</button>
      </div>
    </div>
  )
}
