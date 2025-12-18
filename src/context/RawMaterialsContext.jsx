/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { subscribeToCollection, addDocument, updateDocument, deleteDocument } from '../firebase/firestore'
import { migrateToFirestore } from '../utils/migrateToFirestore'

const RawMaterialsContext = createContext()

const SAMPLE = [
    {
        name: 'Vidrio templado 6mm',
        category: 'Vidrio',
        quantity: 50,
        unit: 'láminas',
        minStock: 20,
        description: 'Láminas de vidrio templado transparente de 6mm'
    },
    {
        name: 'Aluminio natural',
        category: 'Aluminio',
        quantity: 150,
        unit: 'metros',
        minStock: 50,
        description: 'Perfil de aluminio natural para marcos'
    },
    {
        name: 'Vidrio laminado 10mm',
        category: 'Vidrio',
        quantity: 8,
        unit: 'láminas',
        minStock: 10,
        description: 'Láminas de vidrio laminado de seguridad'
    },
    {
        name: 'Aluminio negro',
        category: 'Aluminio',
        quantity: 80,
        unit: 'metros',
        minStock: 40,
        description: 'Perfil de aluminio acabado negro'
    },
    {
        name: 'Vidrio espejo 4mm',
        category: 'Vidrio',
        quantity: 15,
        unit: 'láminas',
        minStock: 10,
        description: 'Láminas de vidrio espejo de 4mm'
    },
    {
        name: 'Silicón para vidrio',
        category: 'Accesorios',
        quantity: 25,
        unit: 'unidades',
        minStock: 15,
        description: 'Tubos de silicón sellador para instalación'
    }
]

export function RawMaterialsProvider({ children }) {
    const [materials, setMaterials] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let unsubscribe = null

        const initializeMaterials = async () => {
            try {
                // Intentar migrar datos de localStorage a Firestore
                await migrateToFirestore('rawMaterials', 'vv_raw_materials', SAMPLE)

                // Suscribirse a cambios en tiempo real
                unsubscribe = subscribeToCollection('rawMaterials', (data) => {
                    setMaterials(data)
                    setLoading(false)
                })
            } catch (err) {
                console.error('Error initializing raw materials:', err)
                setError(err.message)
                setLoading(false)
            }
        }

        initializeMaterials()

        // Cleanup: desuscribirse cuando el componente se desmonte
        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [])

    const addMaterial = async (m) => {
        try {
            const { id, ...materialData } = m
            await addDocument('rawMaterials', materialData)
        } catch (err) {
            console.error('Error adding material:', err)
            throw err
        }
    }

    const updateMaterial = async (id, patch) => {
        try {
            await updateDocument('rawMaterials', id, patch)
        } catch (err) {
            console.error('Error updating material:', err)
            throw err
        }
    }

    const deleteMaterial = async (id) => {
        try {
            await deleteDocument('rawMaterials', id)
        } catch (err) {
            console.error('Error deleting material:', err)
            throw err
        }
    }

    const search = (q) => {
        if (!q) return materials
        const s = q.toLowerCase()
        return materials.filter(m =>
            m.name.toLowerCase().includes(s) ||
            (m.description || '').toLowerCase().includes(s) ||
            (m.category || '').toLowerCase().includes(s)
        )
    }

    const lowStock = materials.filter(m => m.quantity < (m.minStock || 0))

    return (
        <RawMaterialsContext.Provider value={{
            materials,
            addMaterial,
            updateMaterial,
            deleteMaterial,
            search,
            lowStock,
            loading,
            error
        }}>
            {children}
        </RawMaterialsContext.Provider>
    )
}

export const useRawMaterials = () => useContext(RawMaterialsContext)
