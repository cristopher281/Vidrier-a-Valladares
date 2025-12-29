import React from 'react'

export default function WoodProductCard({ product, onDetailsClick }) {
    return (
        <div className="wood-card card">
            <img className="product-img" src={product.img ? product.img.split('/').map(part => encodeURIComponent(part)).join('/') : 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800&auto=format&fit=crop'} alt={product.name} />

            {/* Badge de categoría con tema de madera */}
            <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, rgba(139, 90, 60, 0.9), rgba(212, 165, 116, 0.8))',
                color: 'white',
                fontSize: '11px',
                fontWeight: '700',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}>
                {product.category}
            </div>

            <div style={{ marginTop: '8px' }}>
                <h4 style={{
                    margin: '0 0 6px 0',
                    background: 'linear-gradient(90deg, #d4a574, #f5e6d3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    {product.name}
                </h4>
                <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0 0 12px 0' }}>
                    {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <div>
                        <div style={{
                            fontWeight: 700,
                            fontSize: '18px',
                            background: 'linear-gradient(90deg, var(--wood-accent), var(--wood-light))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            ${product.price.toLocaleString()}
                        </div>
                        <div style={{
                            color: product.stock > 10 ? '#7ee787' : product.stock > 0 ? '#d4a574' : '#ef4444',
                            fontSize: '13px',
                            marginTop: '2px'
                        }}>
                            {product.stock > 0 ? `${product.stock} disponible${product.stock !== 1 ? 's' : ''}` : 'Agotado'}
                        </div>
                    </div>

                    <button
                        className="btn wood-btn"
                        onClick={() => onDetailsClick(product)}
                        style={{
                            background: 'linear-gradient(90deg, #8b5a3c, #a67355)',
                            boxShadow: '0 4px 12px rgba(139, 90, 60, 0.25)',
                            padding: '8px 16px',
                            fontSize: '14px'
                        }}
                    >
                        Ver detalles
                    </button>
                </div>
            </div>
        </div>
    )
}
