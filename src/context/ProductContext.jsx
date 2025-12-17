/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const ProductContext = createContext()

const SAMPLE = [
  { id: 'p1', name: 'Vidrio templado 8mm', category: 'Vidrio templado', price: 120, stock: 25, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', description: 'Vidrio templado de alta resistencia.', featured: true },
  { id: 'p2', name: 'Espejo 6mm', category: 'Espejos', price: 80, stock: 12, img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop', description: 'Espejo con bisel opcional.', featured: false },
  { id: 'p3', name: 'Mampara de baño', category: 'Mamparas', price: 300, stock: 6, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop', description: 'Mampara con herrajes incluidos.', featured: true },
  { id: 'p4', name: 'Vidrio laminado 10mm', category: 'Vidrio laminado', price: 200, stock: 4, img: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=800&auto=format&fit=crop', description: 'Mayor seguridad y aislamiento.', featured: false }
]

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const stored = loadFromStorage('vv_products', SAMPLE)

    // Actualizar productos que tienen imágenes vacías con las imágenes de SAMPLE
    const updated = stored.map(product => {
      const sampleProduct = SAMPLE.find(s => s.id === product.id)
      if (sampleProduct && (!product.img || product.img === '')) {
        return { ...product, img: sampleProduct.img }
      }
      return product
    })

    return updated
  })

  useEffect(() => {
    saveToStorage('vv_products', products)
  }, [products])

  const addProduct = (p) => {
    const item = { ...p, id: p.id || ('p' + Date.now()) }
    setProducts(prev => [item, ...prev])
  }

  const updateProduct = (id, patch) => {
    setProducts(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(it => it.id !== id))
  }

  const search = (q) => {
    if (!q) return products
    const s = q.toLowerCase()
    return products.filter(p => p.name.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s))
  }

  const lowStock = products.filter(p => p.stock < 10)

  const toggleFeatured = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p))
  }

  const getFeaturedProducts = () => {
    return products.filter(p => p.featured === true)
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, search, lowStock, toggleFeatured, getFeaturedProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)