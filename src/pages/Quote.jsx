import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Quote() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        productType: 'Vidrio templado',
        width: '',
        height: '',
        quantity: 1,
        installation: 'yes',
        urgency: 'normal',
        details: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí se conectaría con un backend
        console.log('Presupuesto solicitado:', form)
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setForm({
                name: '',
                email: '',
                phone: '',
                productType: 'Vidrio templado',
                width: '',
                height: '',
                quantity: 1,
                installation: 'yes',
                urgency: 'normal',
                details: ''
            })
        }, 4000)
    }

    return (
        <div>
            <Navbar />

            <section className="container" style={{ padding: '3rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <h1 style={{ marginBottom: 12 }}>Solicitar Presupuesto</h1>
                    <p style={{ color: '#475569', fontSize: '1.1rem' }}>
                        Completa el formulario y te enviaremos una cotización detallada en menos de 24 horas
                    </p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'start' }}>

                    {/* Quote Form */}
                    <div className="form-card">
                        {submitted && (
                            <div className="form-success">
                                Solicitud enviada con éxito. Te contactaremos pronto con tu presupuesto.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="form-modern">

                            <h3 className="form-section-header">Información de Contacto</h3>

                            <div className="form-grid-2">
                                <div className="form-field-floating form-field">
                                    <input
                                        required
                                        className="form-input"
                                        placeholder=" "
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                    <label className="form-label-floating">Nombre Completo *</label>
                                </div>

                                <div className="form-field-floating form-field">
                                    <input
                                        required
                                        type="tel"
                                        className="form-input"
                                        placeholder=" "
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                    />
                                    <label className="form-label-floating">Teléfono *</label>
                                </div>
                            </div>

                            <div className="form-field-floating form-field">
                                <input
                                    required
                                    type="email"
                                    className="form-input"
                                    placeholder=" "
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                                <label className="form-label-floating">Email *</label>
                            </div>

                            <h3 className="form-section-header" style={{ marginTop: '1rem' }}>Detalles del Producto</h3>

                            <div className="form-field">
                                <label className="form-label">Tipo de Producto *</label>
                                <select
                                    value={form.productType}
                                    onChange={e => setForm({ ...form, productType: e.target.value })}
                                    className="form-select"
                                >
                                    <option>Vidrio templado</option>
                                    <option>Vidrio laminado</option>
                                    <option>Espejo</option>
                                    <option>Mampara de baño</option>
                                    <option>Puerta de vidrio</option>
                                    <option>Ventana de aluminio</option>
                                    <option>Cerramiento</option>
                                    <option>Otro (especificar en detalles)</option>
                                </select>
                            </div>

                            <div className="form-grid-3">
                                <div className="form-field-floating form-field">
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder=" "
                                        value={form.width}
                                        onChange={e => setForm({ ...form, width: e.target.value })}
                                    />
                                    <label className="form-label-floating">Ancho (cm)</label>
                                </div>

                                <div className="form-field-floating form-field">
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder=" "
                                        value={form.height}
                                        onChange={e => setForm({ ...form, height: e.target.value })}
                                    />
                                    <label className="form-label-floating">Alto (cm)</label>
                                </div>

                                <div className="form-field-floating form-field">
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        className="form-input"
                                        placeholder=" "
                                        value={form.quantity}
                                        onChange={e => setForm({ ...form, quantity: e.target.value })}
                                    />
                                    <label className="form-label-floating">Cantidad *</label>
                                </div>
                            </div>

                            <div className="form-grid-2">
                                <div className="form-field">
                                    <label className="form-label">¿Necesita instalación? *</label>
                                    <select
                                        value={form.installation}
                                        onChange={e => setForm({ ...form, installation: e.target.value })}
                                        className="form-select"
                                    >
                                        <option value="yes">Sí, incluir instalación</option>
                                        <option value="no">No, solo el producto</option>
                                    </select>
                                </div>

                                <div className="form-field">
                                    <label className="form-label">Urgencia *</label>
                                    <select
                                        value={form.urgency}
                                        onChange={e => setForm({ ...form, urgency: e.target.value })}
                                        className="form-select"
                                    >
                                        <option value="normal">Normal (7-15 días)</option>
                                        <option value="urgent">Urgente (3-5 días)</option>
                                        <option value="flexible">Flexible (más de 15 días)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-field-floating form-field">
                                <textarea
                                    className="form-textarea"
                                    placeholder=" "
                                    value={form.details}
                                    onChange={e => setForm({ ...form, details: e.target.value })}
                                />
                                <label className="form-label-floating">Detalles Adicionales</label>
                            </div>

                            <button className="form-submit-btn" type="submit">
                                Solicitar Presupuesto
                            </button>
                        </form>
                    </div>

                    {/* Info Panel */}
                    <div>
                        <div className="card" style={{ background: 'linear-gradient(135deg, #0b78d1 0%, #0ea5e9 100%)', color: 'white', marginBottom: 20 }}>
                            <h3 style={{ marginBottom: 12, color: 'white' }}>📋 ¿Cómo funciona?</h3>
                            <div style={{ display: 'grid', gap: 12, fontSize: '0.95rem' }}>
                                <div>
                                    <div style={{ fontWeight: 700 }}>1. Completa el formulario</div>
                                    <div style={{ opacity: 0.9 }}>Proporciona los detalles de tu proyecto</div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>2. Te contactamos</div>
                                    <div style={{ opacity: 0.9 }}>En menos de 24 horas hábiles</div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>3. Recibe tu presupuesto</div>
                                    <div style={{ opacity: 0.9 }}>Cotización detallada sin compromiso</div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ marginBottom: 12 }}>💡 Beneficios</h3>
                            <ul style={{ paddingLeft: 20, display: 'grid', gap: 8, color: '#475569' }}>
                                <li>Presupuesto sin costo</li>
                                <li>Asesoramiento profesional</li>
                                <li>Medidas personalizadas</li>
                                <li>Garantía de 5 años</li>
                                <li>Materiales certificados</li>
                                <li>Instalación profesional</li>
                            </ul>
                        </div>

                        <div className="card" style={{ background: '#fef3c7' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>⚡</div>
                            <div style={{ fontWeight: 700, marginBottom: 4 }}>¿Necesitas ayuda?</div>
                            <div style={{ color: '#78350f', fontSize: '0.9rem', marginBottom: 12 }}>
                                Llámanos al +549 11 1234 5678 y te asesoramos personalmente
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}
