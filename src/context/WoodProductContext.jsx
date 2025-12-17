/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const WoodProductContext = createContext()

const SAMPLE_WOOD_PRODUCTS = [
    {
        id: 'w1',
        name: 'Puerta Principal de Caoba',
        category: 'Puertas',
        price: 4500,
        stock: 8,
        img: 'https://images.unsplash.com/photo-1534172964899-ce7de3e9295c?q=80&w=800&auto=format&fit=crop',
        description: 'Puerta de madera de caoba maciza con diseño clásico. Incluye marco y herrajes de bronce.',
        featured: false
    },
    {
        id: 'w2',
        name: 'Ventana de Madera Doble Hoja',
        category: 'Ventanas',
        price: 2800,
        stock: 12,
        img: 'https://images.unsplash.com/photo-1571864652421-98c7e7076fb5?q=80&w=800&auto=format&fit=crop',
        description: 'Ventana de pino tratado con doble acristalamiento. Excelente aislamiento térmico y acústico.',
        featured: true
    },
    {
        id: 'w3',
        name: 'Escritorio Ejecutivo',
        category: 'Escritorios',
        price: 6200,
        stock: 5,
        img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop',
        description: 'Escritorio de nogal con cajones laterales. Diseño profesional para oficina.',
        featured: true
    },
    {
        id: 'w4',
        name: 'Librero Modular',
        category: 'Muebles',
        price: 3800,
        stock: 7,
        img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=800&auto=format&fit=crop',
        description: 'Librero de 5 repisas en madera de roble. Sistema modular ajustable.',
        featured: false
    },
    {
        id: 'w5',
        name: 'Puerta Interior Minimalista',
        category: 'Puertas',
        price: 2200,
        stock: 15,
        img: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=800&auto=format&fit=crop',
        description: 'Puerta de diseño contemporáneo en madera de cedro. Perfecta para interiores modernos.',
        featured: false
    },
    {
        id: 'w6',
        name: 'Mesa de Juntas Personalizada',
        category: 'A Medida',
        price: 12000,
        stock: 2,
        img: 'https://images.unsplash.com/photo-1595428773691-3df8c4e8c94c?q=80&w=800&auto=format&fit=crop',
        description: 'Mesa de juntas para 12 personas en madera de caoba. Hecha a la medida según especificaciones.',
        featured: false
    },
    {
        id: 'w7',
        name: 'Ventana Tipo Guillotina',
        category: 'Ventanas',
        price: 3200,
        stock: 6,
        img: 'https://images.unsplash.com/photo-1599619351208-3e6906b8524f?q=80&w=800&auto=format&fit=crop',
        description: 'Ventana estilo colonial con sistema de contrapesos. Madera de pino barnizada.',
        featured: false
    },
    {
        id: 'w8',
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
    const [woodProducts, setWoodProducts] = useState(() => {
        const stored = loadFromStorage('vv_wood_products', SAMPLE_WOOD_PRODUCTS)

        // Actualizar productos que tienen imágenes vacías con las imágenes de SAMPLE
        const updated = stored.map(product => {
            const sampleProduct = SAMPLE_WOOD_PRODUCTS.find(s => s.id === product.id)
            if (sampleProduct && (!product.img || product.img === '')) {
                return { ...product, img: sampleProduct.img }
            }
            return product
        })

        return updated
    })

    useEffect(() => {
        saveToStorage('vv_wood_products', woodProducts)
    }, [woodProducts])

    const addWoodProduct = (p) => {
        const item = { ...p, id: p.id || ('w' + Date.now()) }
        setWoodProducts(prev => [item, ...prev])
    }

    const updateWoodProduct = (id, patch) => {
        setWoodProducts(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it))
    }

    const deleteWoodProduct = (id) => {
        setWoodProducts(prev => prev.filter(it => it.id !== id))
    }

    const searchWoodProducts = (q) => {
        if (!q) return woodProducts
        const s = q.toLowerCase()
        return woodProducts.filter(p => p.name.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s))
    }

    const lowStockWood = woodProducts.filter(p => p.stock < 10)

    const toggleFeaturedWood = (id) => {
        setWoodProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p))
    }

    const getFeaturedWoodProducts = () => {
        return woodProducts.filter(p => p.featured === true)
    }

    return (
        <WoodProductContext.Provider value={{ woodProducts, addWoodProduct, updateWoodProduct, deleteWoodProduct, searchWoodProducts, lowStockWood, toggleFeaturedWood, getFeaturedWoodProducts }}>
            {children}
        </WoodProductContext.Provider>
    )
}

export const useWoodProducts = () => useContext(WoodProductContext)
