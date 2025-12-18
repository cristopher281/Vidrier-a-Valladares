/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { subscribeToCollection, addDocument, updateDocument, deleteDocument } from '../firebase/firestore'
import { migrateToFirestore } from '../utils/migrateToFirestore'

const ProductContext = createContext()

const SAMPLE = [
  { name: 'Vidrio templado 8mm', category: 'Vidrio templado', price: 120, stock: 25, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', description: 'Vidrio templado de alta resistencia.', featured: true },
  { name: 'Espejo 6mm', category: 'Espejos', price: 80, stock: 12, img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop', description: 'Espejo con bisel opcional.', featured: false },
  { name: 'Mampara de baño', category: 'Mamparas', price: 300, stock: 6, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop', description: 'Mampara con herrajes incluidos.', featured: true },
  { name: 'Vidrio laminado 10mm', category: 'Vidrio laminado', price: 200, stock: 4, img: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=800&auto=format&fit=crop', description: 'Mayor seguridad y aislamiento.', featured: false }
]

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let unsubscribe = null

    const initializeProducts = async () => {
      try {
        // Intentar migrar datos de localStorage a Firestore
        await migrateToFirestore('products', 'vv_products', SAMPLE)

        // Suscribirse a cambios en tiempo real
        unsubscribe = subscribeToCollection('products', (data) => {
          setProducts(data)
          setLoading(false)
        })
      } catch (err) {
        console.error('Error initializing products:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    initializeProducts()

    // Cleanup: desuscribirse cuando el componente se desmonte
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const addProduct = async (p) => {
    try {
      const { id, ...productData } = p // Remover id si existe, Firestore genera su propio ID
      await addDocument('products', productData)
      // No necesitamos actualizar el estado local, el listener lo hará automáticamente
    } catch (err) {
      console.error('Error adding product:', err)
      throw err
    }
  }

  const updateProduct = async (id, patch) => {
    try {
      await updateDocument('products', id, patch)
      // No necesitamos actualizar el estado local, el listener lo hará automáticamente
    } catch (err) {
      console.error('Error updating product:', err)
      throw err
    }
  }

  const deleteProduct = async (id) => {
    try {
      await deleteDocument('products', id)
      // No necesitamos actualizar el estado local, el listener lo hará automáticamente
    } catch (err) {
      console.error('Error deleting product:', err)
      throw err
    }
  }

  const search = (q) => {
    if (!q) return products
    const s = q.toLowerCase()
    return products.filter(p => p.name.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s))
  }

  const lowStock = products.filter(p => p.stock < 10)

  const toggleFeatured = async (id) => {
    try {
      const product = products.find(p => p.id === id)
      if (product) {
        await updateDocument('products', id, { featured: !product.featured })
      }
    } catch (err) {
      console.error('Error toggling featured:', err)
      throw err
    }
  }

  const getFeaturedProducts = () => {
    return products.filter(p => p.featured === true)
  }

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      search,
      lowStock,
      toggleFeatured,
      getFeaturedProducts,
      loading,
      error
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)