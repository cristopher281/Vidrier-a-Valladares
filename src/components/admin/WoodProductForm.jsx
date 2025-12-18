import React, { useEffect, useState, useRef } from 'react'
import { fileToBase64, compressImage } from '../../utils/storage'

export default function WoodProductForm({ initial, onSave, onCancel }) {
    const [form, setForm] = useState({ name: '', price: 0, stock: 0, category: 'Puertas', description: '', img: '', featured: false })
    const [dragOver, setDragOver] = useState(false)
    const [useUrl, setUseUrl] = useState(false)
    const fileInputRef = useRef()

    useEffect(() => { if (initial) setForm(initial) }, [initial])

    const handleFileObject = async (f) => {
        if (!f) return
        const b = await fileToBase64(f)
        const compressed = await compressImage(b, 800)
        setForm(prev => ({ ...prev, img: compressed }))
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
    }

    const submit = (e) => {
        e.preventDefault()
        const payload = { ...form, price: Number(form.price || 0), stock: Number(form.stock || 0) }
        onSave(payload)
    }

    const woodCategories = ['Puertas', 'Ventanas', 'Escritorios', 'Muebles', 'A Medida']

    return (
        <form onSubmit={submit}>
            <div className="form-section">
                <div className="form-section-title">Imagen del Producto</div>

                {/* Toggle entre URL y subir archivo */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <button
                        type="button"
                        className={!useUrl ? 'btn' : 'btn-secondary'}
                        onClick={() => setUseUrl(false)}
                        style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                        📁 Subir desde Galería
                    </button>
                    <button
                        type="button"
                        className={useUrl ? 'btn' : 'btn-secondary'}
                        onClick={() => setUseUrl(true)}
                        style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                        🔗 Usar URL
                    </button>
                </div>

                {useUrl ? (
                    // Modo URL
                    <div className="form-group">
                        <label className="form-label">URL de la imagen</label>
                        <input
                            className="input"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={form.img}
                            onChange={e => setForm({ ...form, img: e.target.value })}
                        />
                        <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px' }}>
                            💡 Usa enlaces de Unsplash u otros servicios de imágenes
                        </div>
                    </div>
                ) : (
                    // Modo subir archivo - Mobile friendly
                    <>
                        {/* Hidden drag-drop area for desktop compatibility */}
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

                        {/* Mobile & Desktop: Upload Button */}
                        {!form.img && (
                            <button
                                type="button"
                                className="btn"
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                </svg>
                                Seleccionar imagen
                            </button>
                        )}

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            style={{ display: 'none' }}
                        />
                    </>
                )}

                {form.img && (
                    <div className="image-preview-wrap" style={{ marginTop: '12px' }}>
                        <img
                            src={form.img}
                            alt="preview"
                            className="image-preview"
                            onError={(e) => { e.target.style.display = 'none' }}
                        />
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
                    </div>
                )}
            </div>

            <div className="form-section">
                <div className="form-section-title">Información Básica</div>
                <div className="form-group">
                    <label className="form-label">Nombre del Producto</label>
                    <input
                        className="input"
                        placeholder="Ej: Puerta Principal de Caoba"
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
                    <select
                        className="input"
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                    >
                        {woodCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="textarea"
                        placeholder="Describe el producto, materiales, características especiales..."
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
                <button className="btn" type="submit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline', marginRight: 6 }}>
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                    Guardar
                </button>
            </div>
        </form>
    )
}
