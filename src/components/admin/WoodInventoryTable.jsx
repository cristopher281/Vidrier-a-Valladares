import React, { useState } from 'react'
import { useWoodProducts } from '../../context/WoodProductContext'
import WoodProductForm from './WoodProductForm'

export default function WoodInventoryTable() {
    const { woodProducts, deleteWoodProduct, updateWoodProduct, addWoodProduct } = useWoodProducts()
    const [editing, setEditing] = useState(null)

    const save = (p) => {
        if (p.id) updateWoodProduct(p.id, p)
        else addWoodProduct(p)
        setEditing(null)
    }

    const handleDelete = (product) => {
        if (window.confirm(`¿Eliminar "${product.name}"?`)) {
            deleteWoodProduct(product.id)
        }
    }

    const getStockBadge = (stock) => {
        if (stock === 0) return <span className="badge out">Agotado</span>
        if (stock < 10) return <span className="badge low">Bajo</span>
        return <span className="badge ok">Disponible</span>
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Productos de Madera</h3>
                <button className="btn" onClick={() => setEditing({})}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    Nuevo Producto de Madera
                </button>
            </div>

            {editing && (
                <div className="card fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginTop: 0 }}>{editing.id ? 'Editar Producto de Madera' : 'Nuevo Producto de Madera'}</h4>
                    <WoodProductForm initial={editing} onSave={save} onCancel={() => setEditing(null)} />
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
                    <h3 style={{ color: 'var(--muted-2)' }}>No hay productos de madera</h3>
                    <p>Agrega tu primer producto de madera usando el botón "Nuevo Producto de Madera"</p>
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
                                        title="Editar"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                        </svg>
                                    </button>
                                    <button
                                        className="action-btn delete"
                                        onClick={() => handleDelete(p)}
                                        title="Eliminar"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
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
