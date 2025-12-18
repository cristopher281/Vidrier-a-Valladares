import { isCollectionEmpty, addMultipleDocuments } from '../firebase/firestore'
import { loadFromStorage } from './storage'

/**
 * Migra datos de localStorage a Firestore si la colección está vacía
 * @param {string} collectionName - Nombre de la colección en Firestore
 * @param {string} localStorageKey - Key en localStorage
 * @param {Array} sampleData - Datos de ejemplo por defecto
 * @returns {Promise<boolean>} true si se ejecutó la migración, false si no fue necesaria
 */
export async function migrateToFirestore(collectionName, localStorageKey, sampleData = []) {
    try {
        // Verificar si ya se migró (usar un flag en localStorage)
        const migrationKey = `${localStorageKey}_migrated_to_firestore`
        const alreadyMigrated = localStorage.getItem(migrationKey)

        if (alreadyMigrated === 'true') {
            console.log(`✓ Migration for ${collectionName} already completed`)
            return false
        }

        // Verificar si la colección de Firestore está vacía
        const isEmpty = await isCollectionEmpty(collectionName)

        if (!isEmpty) {
            console.log(`✓ Collection ${collectionName} already has data, skipping migration`)
            localStorage.setItem(migrationKey, 'true')
            return false
        }

        // Obtener datos de localStorage
        const localData = loadFromStorage(localStorageKey, sampleData)

        if (!localData || localData.length === 0) {
            console.log(`⚠ No data to migrate for ${collectionName}`)
            localStorage.setItem(migrationKey, 'true')
            return false
        }

        console.log(`🔄 Migrating ${localData.length} items from localStorage to ${collectionName}...`)

        // Preparar datos para Firestore (remover el campo 'id' ya que Firestore genera su propio ID)
        const dataToMigrate = localData.map(item => {
            const { id, ...rest } = item
            return rest
        })

        // Agregar documentos a Firestore
        const ids = await addMultipleDocuments(collectionName, dataToMigrate)

        console.log(`✓ Successfully migrated ${ids.length} items to ${collectionName}`)

        // Marcar como migrado
        localStorage.setItem(migrationKey, 'true')

        return true
    } catch (error) {
        console.error(`❌ Error migrating ${collectionName}:`, error)
        // No marcar como migrado si hubo error, para intentar de nuevo
        throw error
    }
}

/**
 * Fuerza una nueva migración eliminando el flag
 * @param {string} localStorageKey - Key en localStorage
 */
export function resetMigrationFlag(localStorageKey) {
    const migrationKey = `${localStorageKey}_migrated_to_firestore`
    localStorage.removeItem(migrationKey)
    console.log(`🔄 Migration flag reset for ${localStorageKey}`)
}

/**
 * Verifica si ya se migró una colección
 * @param {string} localStorageKey - Key en localStorage
 * @returns {boolean} true si ya se migró
 */
export function isMigrated(localStorageKey) {
    const migrationKey = `${localStorageKey}_migrated_to_firestore`
    return localStorage.getItem(migrationKey) === 'true'
}
