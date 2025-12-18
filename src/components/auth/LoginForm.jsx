import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginForm({ onSwitchToPhone, onSwitchToForgot }) {
    const { loginWithEmail, register, error } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [localError, setLocalError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLocalError('')

        // Validaciones
        if (!email || !password) {
            setLocalError('Por favor completa todos los campos')
            return
        }

        if (password.length < 6) {
            setLocalError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        try {
            setLoading(true)
            if (isRegistering) {
                // Registrar nuevo usuario
                await register(email, password)
                setLocalError('')
                // Después de registrar, automáticamente intenta login
                await loginWithEmail(email, password)
            } else {
                // Login normal
                await loginWithEmail(email, password)
            }
            // El redirect lo manejará automáticamente el AuthContext
        } catch (err) {
            setLocalError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-card fade-in">
                <div className="login-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                    </svg>
                </div>
                <h3>Administración</h3>
                <p className="subtitle">Vidriería Valladares</p>

                {/* Toggle entre Login y Registro */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button
                        type="button"
                        onClick={() => setIsRegistering(false)}
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            background: !isRegistering ? 'linear-gradient(90deg, var(--primary), var(--accent))' : 'transparent',
                            border: !isRegistering ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: isRegistering ? 'normal' : 'bold'
                        }}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsRegistering(true)}
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            background: isRegistering ? 'linear-gradient(90deg, var(--primary), var(--accent))' : 'transparent',
                            border: isRegistering ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: !isRegistering ? 'normal' : 'bold'
                        }}
                    >
                        Registrar
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            className="input"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <input
                            className="input"
                            type="password"
                            placeholder="••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        {isRegistering && (
                            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                                Mínimo 6 caracteres
                            </div>
                        )}
                    </div>

                    {(localError || error) && (
                        <div style={{ color: '#ff6b6b', fontSize: 14, textAlign: 'center' }}>
                            {localError || error}
                        </div>
                    )}

                    <button
                        className="btn btn-large"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (isRegistering ? 'Creando cuenta...' : 'Iniciando sesión...') : (isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión')}
                    </button>

                    {!isRegistering && (
                        <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
                            <button
                                type="button"
                                onClick={onSwitchToForgot}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    padding: 0
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                    )}

                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: 16,
                        marginTop: 8,
                        textAlign: 'center'
                    }}>
                        <button
                            type="button"
                            onClick={onSwitchToPhone}
                            className="btn-secondary"
                            style={{ width: '100%' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8, display: 'inline' }}>
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            Entrar con Teléfono
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
