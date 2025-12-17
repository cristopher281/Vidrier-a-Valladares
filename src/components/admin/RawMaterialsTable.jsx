import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRawMaterials } from '../../context/RawMaterialsContext'
import RawMaterialForm from './RawMaterialForm'

export default function RawMaterialsTable() {
    const { materials, deleteMaterial, updateMaterial, addMaterial } = useRawMaterials()
    const [editing, setEditing] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [searchParams, setSearchParams] = useSearchParams()

    // Check URL params on mount and update filter
    useEffect(() => {
        const filterType = searchParams.get('filter')
        if (filterType === 'low-stock') {
            setStatusFilter('low')
        }
    }, [searchParams])

    const save = (m) => {
        if (m.id) updateMaterial(m.id, m)
        else addMaterial(m)
        setEditing(null)
    }

    const handleDelete = (material) => {
        if (window.confirm(`¿Eliminar "${material.name}"?`)) {
            deleteMaterial(material.id)
        }
    }

    const getStockStatus = (material) => {
        if (material.quantity === 0) return { label: 'Crítico', class: 'out' }
        if (material.quantity < material.minStock) return { label: 'Bajo', class: 'low' }
        return { label: 'Disponible', class: 'ok' }
    }

    const getStockBadge = (material) => {
        const status = getStockStatus(material)
        return <span className={`badge ${status.class}`}>{status.label}</span>
    }

    // Filter materials
    const filteredMaterials = materials.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (m.category && m.category.toLowerCase().includes(searchTerm.toLowerCase()))

        if (!matchesSearch) return false

        if (statusFilter === 'all') return true
        const status = getStockStatus(m)
        return status.class === statusFilter
    })

    const clearFilter = () => {
        setStatusFilter('all')
        setSearchParams({})
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Materias Primas</h3>
                <button className="btn" onClick={() => setEditing({})}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                    Nuevo Material
                </button>
            </div>

            {/* Filter Active Indicator */}
            {searchParams.get('filter') === 'low-stock' && (
                <div className="card fade-in" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.05))', border: '1px solid rgba(251,191,36,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24">
                                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                            </svg>
                            <span style={{ color: '#fbbf24', fontWeight: 600 }}>Mostrando solo materiales con bajo stock</span>
                        </div>
                        <button className="btn-secondary" onClick={clearFilter} style={{ padding: '6px 12px', fontSize: 14 }}>
                            Mostrar Todos
                        </button>
                    </div>
                </div>
            )}

            {/* Search */}
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Buscar material..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="input"
                    style={{ width: '100%', maxWidth: '400px' }}
                />
            </div>

            {/* Form Modal */}
            {editing && (
                <div className="card fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginTop: 0 }}>{editing.id ? 'Editar Material' : 'Nuevo Material'}</h4>
                    <RawMaterialForm initial={editing} onSave={save} onCancel={() => setEditing(null)} />
                </div>
            )}

            {/* Materials Grid */}
            {filteredMaterials.length === 0 ? (
                <div className="empty-state fade-in">
                    <div className="empty-state-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        </svg>
                    </div>
                    <h3 style={{ color: 'var(--muted-2)' }}>No hay materiales</h3>
                    <p>Agrega tu primer material usando el botón "Nuevo Material"</p>
                </div>
            ) : (
                <div className="inventory-grid fade-in-stagger">
                    {filteredMaterials.map(m => (
                        <div key={m.id} className="inventory-card fade-in">
                            <div className="inventory-thumb-wrap" style={{
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 179, 237, 0.08))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                minHeight: '120px'
                            }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--primary)" opacity="0.6">
                                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                </svg>
                            </div>

                            <div className="inventory-info">
                                <div className="inventory-name">{m.name}</div>
                                <div className="inventory-meta">
                                    <span className="category">{m.category || 'Sin categoría'}</span>
                                </div>
                                <div className="inventory-meta" style={{ marginTop: '4px' }}>
                                    <span className="stock">Stock: {m.quantity} {m.unit}</span>
                                    <span className="dot">•</span>
                                    <span className="stock">Mín: {m.minStock} {m.unit}</span>
                                </div>
                            </div>

                            <div className="inventory-footer">
                                <div className="inventory-badges">{getStockBadge(m)}</div>
                                <div className="inventory-actions">
                                    <button
                                        className="action-btn"
                                        onClick={() => setEditing(m)}
                                        title="Editar"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                        </svg>
                                    </button>
                                    <button
                                        className="action-btn delete"
                                        onClick={() => handleDelete(m)}
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
