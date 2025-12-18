/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { subscribeToCollection, addDocument, updateDocument, deleteDocument } from '../firebase/firestore'
import { migrateToFirestore } from '../utils/migrateToFirestore'

const WoodProductContext = createContext()

const SAMPLE_WOOD_PRODUCTS = [
    {
        name: 'Puerta Principal de Caoba',
        category: 'Puertas',
        price: 4500,
        stock: 8,
        img: 'https://images.unsplash.com/photo-1534172964899-ce7de3e9295c?q=80&w=800&auto=format&fit=crop',
        description: 'Puerta de madera de caoba maciza con diseño clásico. Incluye marco y herrajes de bronce.',
        featured: false
    },
    {
        name: 'Ventana de Madera Doble Hoja',
        category: 'Ventanas',
        price: 2800,
        stock: 12,
        img: 'https://images.unsplash.com/photo-1571864652421-98c7e7076fb5?q=80&w=800&auto=format&fit=crop',
        description: 'Ventana de pino tratado con doble acristalamiento. Excelente aislamiento térmico y acústico.',
        featured: true
    },
    {
        name: 'Escritorio Ejecutivo',
        category: 'Escritorios',
        price: 6200,
        stock: 5,
        img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop',
        description: 'Escritorio de nogal con cajones laterales. Diseño profesional para oficina.',
        featured: true
    },
    {
        name: 'Librero Modular',
        category: 'Muebles',
        price: 3800,
        stock: 7,
        img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=800&auto=format&fit=crop',
        description: 'Librero de 5 repisas en madera de roble. Sistema modular ajustable.',
        featured: false
    },
    {
        name: 'Puerta Interior Minimalista',
        category: 'Puertas',
        price: 2200,
        stock: 15,
        img: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=800&auto=format&fit=crop',
        description: 'Puerta de diseño contemporáneo en madera de cedro. Perfecta para interiores modernos.',
        featured: false
    },
    {
        name: 'Mesa de Juntas Personalizada',
        category: 'A Medida',
        price: 12000,
        stock: 2,
        img: 'https://images.unsplash.com/photo-1595428773691-3df8c4e8c94c?q=80&w=800&auto=format&fit=crop',
        description: 'Mesa de juntas para 12 personas en madera de caoba. Hecha a la medida según especificaciones.',
        featured: false
    },
    {
        name: 'Ventana Tipo Guillotina',
        category: 'Ventanas',
        price: 3200,
        stock: 6,
        img: 'https://images.unsplash.com/photo-1599619351208-3e6906b8524f?q=80&w=800&auto=format&fit=crop',
        description: 'Ventana estilo colonial con sistema de contrapesos. Madera de pino barnizada.',
        featured: false
    },
    {
        name: 'Closet Empotrado',
        category: 'Muebles',
        price: 8500,
        stock: 3,
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
        description: 'Sistema de closet empotrado con puertas corredizas. Incluye organización interna.',
        featured: false
    }
]

export function WoodProductProvider({ children }) {
    const [woodProducts, setWoodProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let unsubscribe = null

        const initializeWoodProducts = async () => {
            try {
                // Intentar migrar datos de localStorage a Firestore
                await migrateToFirestore('woodProducts', 'vv_wood_products', SAMPLE_WOOD_PRODUCTS)

                // Suscribirse a cambios en tiempo real
                unsubscribe = subscribeToCollection('woodProducts', (data) => {
                    setWoodProducts(data)
                    setLoading(false)
                })
            } catch (err) {
                console.error('Error initializing wood products:', err)
                setError(err.message)
                setLoading(false)
            }
        }

        initializeWoodProducts()

        // Cleanup: desuscribirse cuando el componente se desmonte
        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [])

    const addWoodProduct = async (p) => {
        try {
            const { id, ...productData } = p
            await addDocument('woodProducts', productData)
        } catch (err) {
            console.error('Error adding wood product:', err)
            throw err
        }
    }

    const updateWoodProduct = async (id, patch) => {
        try {
            await updateDocument('woodProducts', id, patch)
        } catch (err) {
            console.error('Error updating wood product:', err)
            throw err
        }
    }

    const deleteWoodProduct = async (id) => {
        try {
            await deleteDocument('woodProducts', id)
        } catch (err) {
            console.error('Error deleting wood product:', err)
            throw err
        }
    }

    const searchWoodProducts = (q) => {
        if (!q) return woodProducts
        const s = q.toLowerCase()
        return woodProducts.filter(p => p.name.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s))
    }

    const lowStockWood = woodProducts.filter(p => p.stock < 10)

    const toggleFeaturedWood = async (id) => {
        try {
            const product = woodProducts.find(p => p.id === id)
            if (product) {
                await updateDocument('woodProducts', id, { featured: !product.featured })
            }
        } catch (err) {
            console.error('Error toggling featured wood product:', err)
            throw err
        }
    }

    const getFeaturedWoodProducts = () => {
        return woodProducts.filter(p => p.featured === true)
    }

    return (
        <WoodProductContext.Provider value={{
            woodProducts,
            addWoodProduct,
            updateWoodProduct,
            deleteWoodProduct,
            searchWoodProducts,
            lowStockWood,
            toggleFeaturedWood,
            getFeaturedWoodProducts,
            loading,
            error
        }}>
            {children}
        </WoodProductContext.Provider>
    )
}

export const useWoodProducts = () => useContext(WoodProductContext)
