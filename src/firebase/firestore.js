import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore'
import { db } from './config'

/**
 * Obtiene todos los documentos de una colección
 * @param {string} collectionName - Nombre de la colección
 * @returns {Promise<Array>} Array de objetos con id y datos
 */
export async function getCollection(collectionName) {
    try {
        const q = query(collection(db, collectionName), orderBy('__name__'))
        const querySnapshot = await getDocs(q)
        const data = []
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        })
        return data
    } catch (error) {
        console.error(`Error getting collection ${collectionName}:`, error)
        throw error
    }
}

/**
 * Obtiene un documento específico por ID
 * @param {string} collectionName - Nombre de la colección
 * @param {string} id - ID del documento
 * @returns {Promise<Object|null>} Objeto con los datos o null si no existe
 */
export async function getDocument(collectionName, id) {
    try {
        const docRef = doc(db, collectionName, id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            return null
        }
    } catch (error) {
        console.error(`Error getting document ${id} from ${collectionName}:`, error)
        throw error
    }
}

/**
 * Agrega un nuevo documento a una colección
 * @param {string} collectionName - Nombre de la colección
 * @param {Object} data - Datos del documento
 * @returns {Promise<string>} ID del documento creado
 */
export async function addDocument(collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data)
        return docRef.id
    } catch (error) {
        console.error(`Error adding document to ${collectionName}:`, error)
        throw error
    }
}

/**
 * Actualiza un documento existente
 * @param {string} collectionName - Nombre de la colección
 * @param {string} id - ID del documento
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<void>}
 */
export async function updateDocument(collectionName, id, data) {
    try {
        const docRef = doc(db, collectionName, id)
        await updateDoc(docRef, data)
    } catch (error) {
        console.error(`Error updating document ${id} in ${collectionName}:`, error)
        throw error
    }
}

/**
 * Elimina un documento
 * @param {string} collectionName - Nombre de la colección
 * @param {string} id - ID del documento
 * @returns {Promise<void>}
 */
export async function deleteDocument(collectionName, id) {
    try {
        const docRef = doc(db, collectionName, id)
        await deleteDoc(docRef)
    } catch (error) {
        console.error(`Error deleting document ${id} from ${collectionName}:`, error)
        throw error
    }
}

/**
 * Suscribe a cambios en tiempo real de una colección
 * @param {string} collectionName - Nombre de la colección
 * @param {Function} callback - Función que se ejecutará con los datos actualizados
 * @returns {Function} Función para cancelar la suscripción
 */
export function subscribeToCollection(collectionName, callback) {
    try {
        const q = query(collection(db, collectionName), orderBy('__name__'))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = []
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() })
            })
            callback(data)
        }, (error) => {
            console.error(`Error in snapshot listener for ${collectionName}:`, error)
        })

        return unsubscribe
    } catch (error) {
        console.error(`Error subscribing to collection ${collectionName}:`, error)
        throw error
    }
}

/**
 * Verifica si una colección está vacía
 * @param {string} collectionName - Nombre de la colección
 * @returns {Promise<boolean>} true si está vacía, false si tiene documentos
 */
export async function isCollectionEmpty(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName))
        return querySnapshot.empty
    } catch (error) {
        console.error(`Error checking if collection ${collectionName} is empty:`, error)
        throw error
    }
}

/**
 * Agrega múltiples documentos a una colección
 * @param {string} collectionName - Nombre de la colección
 * @param {Array<Object>} documents - Array de documentos a agregar
 * @returns {Promise<Array<string>>} Array de IDs de los documentos creados
 */
export async function addMultipleDocuments(collectionName, documents) {
    try {
        const ids = []
        for (const doc of documents) {
            const id = await addDocument(collectionName, doc)
            ids.push(id)
        }
        return ids
    } catch (error) {
        console.error(`Error adding multiple documents to ${collectionName}:`, error)
        throw error
    }
}
