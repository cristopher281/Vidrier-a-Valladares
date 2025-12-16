import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { MdLocationOn, MdPhone, MdEmail, MdSchedule } from 'react-icons/md'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí se conectaría con un backend o servicio de email
        console.log('Formulario enviado:', form)
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setForm({ name: '', email: '', phone: '', message: '' })
        }, 3000)
    }

    return (
        <div>
            <Navbar />

            <section className="container" style={{ padding: '3rem 0' }}>
                <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Contáctenos</h1>

                <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'start' }}>

                    {/* Contact Form */}
                    <div className="form-card">
                        <h3 style={{ marginBottom: 16 }}>Envíanos un Mensaje</h3>
                        {submitted && (
                            <div className="form-success">
                                Mensaje enviado con éxito. Te contactaremos pronto.
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="form-modern form-stagger">
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
                                    type="email"
                                    className="form-input"
                                    placeholder=" "
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                                <label className="form-label-floating">Email *</label>
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

                            <div className="form-field-floating form-field">
                                <textarea
                                    required
                                    className="form-textarea"
                                    placeholder=" "
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                />
                                <label className="form-label-floating">Mensaje *</label>
                            </div>

                            <button className="form-submit-btn" type="submit">Enviar Mensaje</button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div className="card" style={{ marginBottom: 24 }}>
                            <h3 style={{ marginBottom: 16 }}>Información de Contacto</h3>
                            <div style={{ display: 'grid', gap: 16 }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <MdLocationOn style={{ fontSize: '1.5rem', color: '#ef4444' }} />
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Dirección</div>
                                        <div style={{ color: '#475569' }}>
                                            <a href="https://maps.app.goo.gl/2qcT5tGddjV2JkwGA" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                                Ver ubicación en Google Maps
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <MdPhone style={{ fontSize: '1.5rem', color: '#3b82f6' }} />
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Teléfono</div>
                                        <div style={{ color: '#475569' }}>+505 57079251</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <MdEmail style={{ fontSize: '1.5rem', color: '#8b5cf6' }} />
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Email</div>
                                        <div style={{ color: '#475569' }}>vallecristopher102@gmail.com</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <MdSchedule style={{ fontSize: '1.5rem', color: '#10b981' }} />
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Horario</div>
                                        <div style={{ color: '#475569' }}>
                                            Lun-Vie: 8:00 - 5:00<br />
                                            Sábados: 9:00 - 4:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ marginBottom: 12 }}>Síguenos en Redes</h3>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <a href="https://wa.me/50581663656" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <button style={{ padding: '8px 16px' }}>WhatsApp</button>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Map Section */}
            <section className="container" style={{ padding: '2rem 0' }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', height: 400 }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3901.7488!2d-86.2384!3d12.1164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDA2JzU5LjAiTiA4NsKwMTQnMTguMiJX!5e0!3m2!1ses!2sni!4v1734898000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Ubicación"
                    />
                </div>
            </section>

            <Footer />
        </div>
    )
}
