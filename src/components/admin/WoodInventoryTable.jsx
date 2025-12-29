import React, { useState } from 'react'
import { useWoodProducts } from '../../context/WoodProductContext'
import WoodProductForm from './WoodProductForm'

export default function WoodInventoryTable() {
    const { woodProducts, updateWoodProduct, loading } = useWoodProducts()
    const [editing, setEditing] = useState(null)

    const save = (p) => {
        if (p.id) {
            updateWoodProduct(p.id, p)
            setEditing(null)
        }
    }

    const getStockBadge = (stock) => {
        if (stock === 0) return <span className="badge out">Agotado</span>
        if (stock < 10) return <span className="badge low">Bajo</span>
        return <span className="badge ok">Disponible</span>
    }

    if (loading) {
        return (
            <div className="fade-in" style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⌛</div>
                <h3>Cargando productos...</h3>
            </div>
        )
    }

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Productos de Madera</h3>
                    <div style={{
                        padding: '8px 16px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '8px',
                        color: '#60a5fa',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        📦 {woodProducts.length} productos
                    </div>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '8px', marginBottom: 0 }}>
                    ℹ️ Las imágenes están hardcodeadas. Solo puedes editar el nombre, precio, stock, categoría y descripción.
                </p>
            </div>

            {editing && (
                <div className="card fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginTop: 0 }}>Editar Producto de Madera</h4>
                    <WoodProductForm
                        initial={editing}
                        onSave={save}
                        onCancel={() => setEditing(null)}
                        imageReadOnly={true}
                    />
                </div>
            )}

            {woodProducts.length === 0 ? (
                <div className="empty-state fade-in">
                    <div className="empty-state-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L4 7v9c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V7l-8-5z" />
                            <path d="M12 8v8M8 12h8" />
                        </svg>
                    </div>
                    <h3 style={{ color: 'var(--muted-2)' }}>Cargando productos...</h3>
                    <p>Espera un momento mientras se cargan los productos desde Firebase</p>
                </div>
            ) : (
                <div className="inventory-grid fade-in-stagger">
                    {woodProducts.map(p => (
                        <div key={p.id} className="inventory-card fade-in">
                            <div className="inventory-thumb-wrap">
                                <img
                                    src={p.img || 'https://via.placeholder.com/160x120?text=Madera'}
                                    alt={p.name}
                                    className="inventory-thumb"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/160x120?text=Error' }}
                                />
                                {p.featured && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                                    }}>
                                        ⭐ Destacado
                                    </div>
                                )}
                            </div>

                            <div className="inventory-info">
                                <div className="inventory-name">{p.name}</div>
                                <div className="inventory-meta">
                                    <span className="price">${p.price}</span>
                                    <span className="dot">•</span>
                                    <span className="stock">Stock: {p.stock}</span>
                                </div>
                                {p.category && (
                                    <div className="inventory-category">{p.category}</div>
                                )}
                            </div>

                            <div className="inventory-footer">
                                <div className="inventory-badges">{getStockBadge(p.stock)}</div>
                                <div className="inventory-actions">
                                    <button
                                        className="action-btn"
                                        onClick={() => setEditing(p)}
                                        title="Editar información"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
