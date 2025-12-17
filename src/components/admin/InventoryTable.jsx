import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../../context/ProductContext'
import ProductForm from './ProductForm'
import RawMaterialsTable from './RawMaterialsTable'

export default function InventoryTable() {
  const { products, deleteProduct, updateProduct, addProduct } = useProducts()
  const [editing, setEditing] = useState(null)
  const [activeTab, setActiveTab] = useState('products') // 'products' or 'materials'
  const [searchParams, setSearchParams] = useSearchParams()

  const save = (p) => {
    if (p.id) updateProduct(p.id, p)
    else addProduct(p)
    setEditing(null)
  }

  const handleDelete = (product) => {
    if (window.confirm(`¿Eliminar "${product.name}"?`)) {
      deleteProduct(product.id)
    }
  }

  const getStockBadge = (stock) => {
    if (stock === 0) return <span className="badge out">Agotado</span>
    if (stock < 10) return <span className="badge low">Bajo</span>
    return <span className="badge ok">Disponible</span>
  }

  // Filter products based on URL params
  const filterType = searchParams.get('filter')
  const filteredProducts = useMemo(() => {
    if (filterType === 'low-stock') {
      return products.filter(p => p.stock < 10)
    }
    return products
  }, [products, filterType])

  const clearFilter = () => {
    setSearchParams({})
  }

  return (
    <div className="fade-in">
      {/* Tab Navigation */}
      <div className="tab-container" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
          </svg>
          Productos Terminados
        </button>
        <button
          className={`tab-button ${activeTab === 'materials' ? 'active' : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
          Materiales Crudos
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'materials' ? (
        <RawMaterialsTable />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Productos Terminados</h3>
            <button className="btn" onClick={() => setEditing({})}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Nuevo Producto
            </button>
          </div>

          {filterType === 'low-stock' && (
            <div className="card fade-in" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.05))', border: '1px solid rgba(251,191,36,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                  <span style={{ color: '#fbbf24', fontWeight: 600 }}>Mostrando solo productos con bajo stock</span>
                </div>
                <button className="btn-secondary" onClick={clearFilter} style={{ padding: '6px 12px', fontSize: 14 }}>
                  Mostrar Todos
                </button>
              </div>
            </div>
          )}

          {editing && (
            <div className="card fade-in" style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginTop: 0 }}>{editing.id ? 'Editar Producto' : 'Nuevo Producto'}</h4>
              <ProductForm initial={editing} onSave={save} onCancel={() => setEditing(null)} />
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="empty-state fade-in">
              <div className="empty-state-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                </svg>
              </div>
              <h3 style={{ color: 'var(--muted-2)' }}>No hay productos</h3>
              <p>Agrega tu primer producto usando el botón "Nuevo Producto"</p>
            </div>
          ) : (
            <div className="inventory-grid fade-in-stagger">
              {filteredProducts.map(p => (
                <div key={p.id} className="inventory-card fade-in">
                  <div className="inventory-thumb-wrap">
                    <img
                      src={p.img || 'https://via.placeholder.com/160x120'}
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
        </>
      )}
    </div>
  )
}
