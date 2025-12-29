import React, { useEffect, useState, useRef } from 'react'
import { fileToBase64, compressImage } from '../../utils/storage'

// Imágenes disponibles en la carpeta public
const PUBLIC_IMAGES = [
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.15_81f10d2b.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.16_6c0c3a0e.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.16_82b5bf5c.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.16_ec6db6b9.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.17_6583346d.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.17_7b67cec9.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.17_fb6e7c2d.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.18_7ff53ef5.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.18_90d0c279.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.19_7d2f0892.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.19_dda384a6.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.19_fc3b5279.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.19_fc8b61b7.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.20_5bf8afde.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.20_66e02be8.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.20_adf3b2dd.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.21_e623456c.jpg',
  '/Imagen de WhatsApp 2025-12-17 a las 12.55.21_f39436ec.jpg',
]

export default function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({ name: '', price: 0, stock: 0, category: 'Vidrio templado', description: '', img: '' })
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPublicGallery, setShowPublicGallery] = useState(false)
  const fileInputRef = useRef()

  useEffect(() => { if (initial) setForm(initial) }, [initial])

  const handleFileObject = async (f) => {
    if (!f) return
    const b = await fileToBase64(f)
    const compressed = await compressImage(b, 800)
    // preview image as compressed data url
    setForm(prev => ({ ...prev, img: compressed }))
    // also keep original file reference for upload if needed
    setSelectedFile(f)
  }

  const handleFile = async (e) => {
    const f = e.target.files && e.target.files[0]
    await handleFileObject(f)
  }

  const onDrop = async (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    await handleFileObject(f)
  }

  const removeImage = () => {
    setForm(prev => ({ ...prev, img: '' }))
    setSelectedFile(null)
  }

  const selectPublicImage = (imagePath) => {
    setForm(prev => ({ ...prev, img: imagePath }))
    setSelectedFile(null)
    setShowPublicGallery(false)
  }

  const submit = async (e) => {
    e.preventDefault()
    let imgUrl = form.img
    setSaving(true)
    try {
      // If img is a data URL (compressed preview), upload it to Firebase Storage
      if (form.img && form.img.startsWith('data:')) {
        // dynamic import of storage helper to avoid loading storage in non-Firebase envs
        const { uploadBase64 } = await import('../../firebase/storage')
        const timestamp = Date.now()
        const ext = form.img.split(';')[0].split('/')[1] || 'jpg'
        const safeName = (form.name || 'product').replace(/[^a-z0-9-_]/gi, '_').toLowerCase()
        const path = `products/${safeName}_${timestamp}.${ext}`
        imgUrl = await uploadBase64(form.img, path)
      }

      const payload = { ...form, img: imgUrl, price: Number(form.price || 0), stock: Number(form.stock || 0) }
      // Esperamos a que el parent guarde y, si falla, se lanzará excepción
      await onSave(payload)
    } catch (err) {
      console.error('Error uploading or saving product:', err)
      // Mostrar error visible al usuario
      alert('Error al guardar el producto: ' + (err && err.message ? err.message : err))
      return
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="form-section">
        <div className="form-section-title">Imagen del Producto</div>

        {/* Desktop: Drag & Drop Area */}
        <div
          className={`drag-drop-area ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          style={{ display: 'none' }}
        >
          <div className="drag-drop-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
          <div className="drag-drop-text">
            <strong>{form.img ? 'Cambiar imagen' : 'Subir imagen'}</strong>
            Arrastra una imagen aquí o haz clic para seleccionar
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
        </div>

        {/* Mobile & Desktop: Upload Buttons */}
        <div style={{ display: 'grid', gap: '12px' }}>
          {!form.img && (
            <>
              <button
                type="button"
                className="btn"
                onClick={() => setShowPublicGallery(!showPublicGallery)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                </svg>
                {showPublicGallery ? 'Ocultar' : 'Seleccionar de'} galería pública
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                Subir nueva imagen
              </button>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>

        {/* Public Image Gallery */}
        {showPublicGallery && !form.img && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '8px'
          }}>
            <div style={{
              marginBottom: '12px',
              fontWeight: '600',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
              </svg>
              Imágenes Disponibles ({PUBLIC_IMAGES.length})
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '12px',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '4px'
            }}>
              {PUBLIC_IMAGES.map((imgPath, index) => (
                <div
                  key={index}
                  onClick={() => selectPublicImage(imgPath)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    transition: 'all 0.2s ease',
                    aspectRatio: '1',
                    position: 'relative',
                    background: 'var(--bg-2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '2px solid var(--primary)'
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '2px solid transparent'
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <img
                    src={encodeURI(imgPath)}
                    alt={`Imagen ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {form.img && (
          <div className="image-preview-wrap">
            <img src={form.img} alt="preview" className="image-preview" />

            {/* Check if image is from public gallery (read-only) */}
            {PUBLIC_IMAGES.includes(form.img) ? (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: 'var(--primary)'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                <div>
                  <strong>Imagen de galería pública</strong>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '2px' }}>
                    Esta imagen no se puede cambiar. Solo puedes editar la información del producto.
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="remove-image-btn"
                onClick={removeImage}
                title="Eliminar imagen"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="form-section">
        <div className="form-section-title">Información Básica</div>
        <div className="form-group">
          <label className="form-label">Nombre del Producto</label>
          <input
            className="input"
            placeholder="Ej: Espejo rectangular 60x80cm"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Precio ($)</label>
            <input
              className="input"
              type="number"
              placeholder="0.00"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Stock (unidades)</label>
            <input
              className="input"
              type="number"
              placeholder="0"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Categoría</label>
          <input
            className="input"
            placeholder="Ej: Vidrio templado, Espejo, Ventana"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            className="textarea"
            placeholder="Describe el producto, dimensiones, características especiales..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.featured || false}
              onChange={e => setForm({ ...form, featured: e.target.checked })}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span className="form-label" style={{ margin: 0 }}>
              ⭐ Marcar como Producto Destacado
            </span>
          </label>
          <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', marginLeft: '26px' }}>
            Los productos destacados aparecen en la página principal
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button className="btn" type="submit" disabled={saving}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
