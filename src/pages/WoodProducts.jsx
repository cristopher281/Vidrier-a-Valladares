import React, { useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchBar from '../components/catalog/SearchBar'
import CategoryFilter from '../components/catalog/CategoryFilter'
import WoodProductCard from '../components/catalog/WoodProductCard'
import ProductModal from '../components/catalog/ProductModal'
import { useWoodProducts } from '../context/WoodProductContext'

export default function WoodProducts() {
    const { woodProducts } = useWoodProducts()
    const [q, setQ] = useState('')
    const [cat, setCat] = useState('Todo')
    const [selectedProduct, setSelectedProduct] = useState(null)

    const filtered = useMemo(() => {
        return woodProducts.filter(p => (cat === 'Todo' || p.category === cat) && (!q || p.name.toLowerCase().includes(q.toLowerCase()) || (p.description || '').toLowerCase().includes(q.toLowerCase())))
    }, [woodProducts, q, cat])

    const handleProductClick = (product) => {
        setSelectedProduct(product)
    }

    const handleCloseModal = () => {
        setSelectedProduct(null)
    }

    // Categorías específicas para productos de madera
    const woodCategories = ['Todo', 'Puertas', 'Ventanas', 'Escritorios', 'Muebles', 'A Medida']

    return (
        <div>
            <Navbar />

            {/* Hero Section con tema de madera */}
            <div className="wood-hero" style={{
                background: 'linear-gradient(135deg, rgba(139, 90, 60, 0.15) 0%, rgba(212, 165, 116, 0.08) 50%, transparent 100%)',
                padding: '3rem 0 2rem',
                marginBottom: '1rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(139, 90, 60, 0.12) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ maxWidth: '700px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 14px',
                            background: 'linear-gradient(90deg, rgba(139, 90, 60, 0.15), rgba(212, 165, 116, 0.1))',
                            borderRadius: '20px',
                            marginBottom: '1rem',
                            border: '1px solid rgba(139, 90, 60, 0.2)'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4a574" strokeWidth="2">
                                <path d="M12 2L4 7v9c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V7l-8-5z" />
                                <path d="M12 8v8M8 12h8" />
                            </svg>
                            <span style={{ color: '#d4a574', fontSize: '13px', fontWeight: '600' }}>Carpintería Profesional</span>
                        </div>

                        <h1 style={{
                            fontSize: '42px',
                            margin: '0 0 1rem 0',
                            background: 'linear-gradient(135deg, #f5e6d3 0%, #d4a574 50%, #8b5a3c 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: '900',
                            lineHeight: '1.1'
                        }}>
                            Muebles & Carpintería de Madera
                        </h1>

                        <p style={{
                            color: 'var(--muted-2)',
                            fontSize: '16px',
                            lineHeight: '1.6',
                            marginBottom: '1.5rem'
                        }}>
                            Diseños exclusivos en madera de alta calidad. Puertas, ventanas, escritorios profesionales y muebles a medida.
                            Cada pieza es elaborada con precisión y acabados de primera clase.
                        </p>

                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <div style={{
                                padding: '8px 16px',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                                border: '1px solid rgba(212, 165, 116, 0.15)',
                                borderRadius: '8px',
                                fontSize: '13px',
                                color: '#d4a574'
                            }}>
                                ✓ Madera de Primera Calidad
                            </div>
                            <div style={{
                                padding: '8px 16px',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                                border: '1px solid rgba(212, 165, 116, 0.15)',
                                borderRadius: '8px',
                                fontSize: '13px',
                                color: '#d4a574'
                            }}>
                                ✓ Diseños Personalizados
                            </div>
                            <div style={{
                                padding: '8px 16px',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                                border: '1px solid rgba(212, 165, 116, 0.15)',
                                borderRadius: '8px',
                                fontSize: '13px',
                                color: '#d4a574'
                            }}>
                                ✓ Instalación Profesional
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Catálogo */}
            <div className="container" style={{ padding: '2rem 0' }}>
                <SearchBar onSearch={setQ} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
                    <CategoryFilter value={cat} onChange={setCat} categories={woodCategories} />
                    <div style={{
                        color: 'var(--muted)',
                        fontSize: '14px',
                        background: 'linear-gradient(90deg, rgba(212, 165, 116, 0.08), transparent)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid rgba(212, 165, 116, 0.1)'
                    }}>
                        📦 Mostrando {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        color: 'var(--muted)'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🔍</div>
                        <h3 style={{ margin: '0 0 0.5rem 0' }}>No se encontraron productos</h3>
                        <p>Intenta con otra búsqueda o categoría</p>
                    </div>
                ) : (
                    <div className="grid" style={{ marginTop: 12 }}>
                        {filtered.map(p => <WoodProductCard key={p.id} product={p} onDetailsClick={handleProductClick} />)}
                    </div>
                )}
            </div>

            <Footer />
            <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        </div>
    )
}
