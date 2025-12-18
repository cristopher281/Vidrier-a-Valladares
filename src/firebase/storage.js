import { getStorage, ref, uploadString, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from './config'

const storage = getStorage(app)

export async function uploadBase64(base64Data, path) {
  // path: e.g. 'products/imagen1.jpg'
  const storageRef = ref(storage, path)
  // base64Data expected as data URL (data:image/...;base64,....)
  await uploadString(storageRef, base64Data, 'data_url')
  const url = await getDownloadURL(storageRef)
  return url
}

export async function uploadFile(file, path) {
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}

export default storage
