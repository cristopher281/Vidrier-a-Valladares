/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { WOOD_PRODUCT_IMAGES } from '../data/woodProductsImages'

const WoodProductContext = createContext()

/**
 * Este Context combina:
 * 1. Las rutas de imágenes HARDCODEADAS (no se pueden cambiar)
 * 2. La información editable desde Firebase (nombre, descripción, precio, etc.)
 * 
 * Solo la información se sincroniza en tiempo real con Firebase.
 * Las imágenes siempre usan las rutas fijas del archivo woodProductsImages.js
 */

export function WoodProductProvider({ children }) {
    const [woodProducts, setWoodProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Referencias a Firebase
        const productsRef = collection(db, 'woodProducts')

        // Suscripción en tiempo real a los cambios en Firebase
        const unsubscribe = onSnapshot(
            productsRef,
            async (snapshot) => {
                try {
                    // Obtener datos de Firebase
                    const firebaseData = {}
                    snapshot.forEach((doc) => {
                        firebaseData[doc.id] = { id: doc.id, ...doc.data() }
                    })

                    // Si no hay datos en Firebase, inicializar con valores por defecto
                    if (snapshot.empty) {
                        console.log('Inicializando productos de madera en Firebase...')

                        for (const imageConfig of WOOD_PRODUCT_IMAGES) {
                            const defaultProduct = {
                                name: imageConfig.defaultName,
                                category: imageConfig.defaultCategory,
                                description: 'Excelente producto de madera de alta calidad.',
                                price: 3500,
                                stock: 10,
                                featured: false,
                                createdAt: new Date().toISOString()
                            }

                            await setDoc(doc(db, 'woodProducts', imageConfig.id), defaultProduct)
                        }
                        return // El onSnapshot se va a disparar de nuevo con los nuevos datos
                    }

                    // Combinar las imágenes hardcodeadas con la información de Firebase
                    const mergedProducts = WOOD_PRODUCT_IMAGES.map(imageConfig => {
                        const firebaseInfo = firebaseData[imageConfig.id] || {
                            name: imageConfig.defaultName,
                            category: imageConfig.defaultCategory,
                            description: 'Excelente producto de madera de alta calidad.',
                            price: 3500,
                            stock: 10,
                            featured: false
                        }

                        return {
                            id: imageConfig.id,
                            img: imageConfig.imagePath, // ← RUTA HARDCODEADA (nunca cambia)
                            name: firebaseInfo.name,
                            category: firebaseInfo.category,
                            description: firebaseInfo.description,
                            price: firebaseInfo.price,
                            stock: firebaseInfo.stock,
                            featured: firebaseInfo.featured || false
                        }
                    })

                    setWoodProducts(mergedProducts)
                    setLoading(false)
                } catch (err) {
                    console.error('Error procesando productos:', err)
                    setError(err.message)
                    setLoading(false)
                }
            },
            (err) => {
                console.error('Error en la suscripción de Firebase:', err)
                setError(err.message)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [])

    const updateWoodProduct = async (id, patch) => {
        try {
            // Solo permitir actualizar información, no la imagen
            const { img, ...allowedFields } = patch

            if (img) {
                console.warn('No se puede cambiar la ruta de la imagen. Las imágenes están hardcodeadas.')
            }

            const productRef = doc(db, 'woodProducts', id)
            await updateDoc(productRef, {
                ...allowedFields,
                updatedAt: new Date().toISOString()
            })
        } catch (err) {
            console.error('Error actualizando producto:', err)
            throw err
        }
    }

    const toggleFeaturedWood = async (id) => {
        try {
            const product = woodProducts.find(p => p.id === id)
            if (product) {
                await updateWoodProduct(id, { featured: !product.featured })
            }
        } catch (err) {
            console.error('Error toggling featured:', err)
            throw err
        }
    }

    const searchWoodProducts = (q) => {
        if (!q) return woodProducts
        const s = q.toLowerCase()
        return woodProducts.filter(p =>
            p.name.toLowerCase().includes(s) ||
            (p.description || '').toLowerCase().includes(s)
        )
    }

    const lowStockWood = woodProducts.filter(p => p.stock < 10)

    const getFeaturedWoodProducts = () => {
        return woodProducts.filter(p => p.featured === true)
    }

    return (
        <WoodProductContext.Provider value={{
            woodProducts,
            updateWoodProduct,
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
