import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { MdLocationOn, MdPhone, MdEmail, MdSchedule } from 'react-icons/md'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
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

            <section className="container" style={{ padding: '3rem 1rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Contáctenos</h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>

                    {/* Contact Form */}
                    <div className="card">
                        <h3 style={{ marginTop: 0, marginBottom: 24 }}>Envíanos un Mensaje</h3>

                        {submitted && (
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                color: '#10b981',
                                fontSize: '14px'
                            }}>
                                ✓ Mensaje enviado con éxito. Te contactaremos pronto.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">Nombre Completo *</label>
                                <input
                                    required
                                    className="input"
                                    placeholder="Tu nombre completo"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Correo electrónico *</label>
                                <input
                                    required
                                    type="email"
                                    className="input"
                                    placeholder="tu@email.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Teléfono *</label>
                                <input
                                    required
                                    type="tel"
                                    className="input"
                                    placeholder="+505 0000 0000"
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Mensaje *</label>
                                <textarea
                                    required
                                    className="textarea"
                                    placeholder="Escribe tu mensaje aquí..."
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    rows="5"
                                />
                            </div>

                            <button
                                className="btn"
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    marginTop: '8px'
                                }}
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div className="card" style={{ marginBottom: 24 }}>
                            <h3 style={{ marginTop: 0, marginBottom: 20 }}>Información de contacto</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <MdLocationOn style={{ fontSize: '1.5rem', color: 'var(--primary)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Dirección</div>
                                        <a
                                            href="https://maps.app.goo.gl/2qcT5tGddjV2JkwGA"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}
                                        >
                                            Ver ubicación en Google Maps
                                        </a>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <MdPhone style={{ fontSize: '1.5rem', color: 'var(--primary)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Teléfono</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '14px' }}>+505 57079251</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <MdEmail style={{ fontSize: '1.5rem', color: 'var(--primary)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Correo electrónico</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '14px', wordBreak: 'break-all' }}>
                                            vallecristopher102@gmail.com
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 12, alignItems: 'start' }}>
                                    <MdSchedule style={{ fontSize: '1.5rem', color: 'var(--primary)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Horario</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                                            Lun-Vie: 8:00 - 5:00<br />
                                            Sábados: 9:00 - 4:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ marginTop: 0, marginBottom: 16 }}>Síguenos en Redes</h3>
                            <a
                                href="https://wa.me/50581663656"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', display: 'block' }}
                            >
                                <button
                                    className="btn"
                                    style={{
                                        width: '100%',
                                        padding: '10px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </button>
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            {/* Map Section */}
            <section className="container" style={{ padding: '2rem 1rem' }}>
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
