import React from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const iconStyle = { color: 'var(--accent)', marginRight: 12, minWidth: 20, minHeight: 20 }

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <h4>Vidriería Valladares</h4>
            <p>Calidad en vidrio y aluminio.</p>
          </div>

          <div>
            <h5>Enlaces</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Link to="/" style={{ color: 'var(--muted)' }}>Inicio</Link>
              <Link to="/catalog" style={{ color: 'var(--muted)' }}>Productos</Link>
              <Link to="/about" style={{ color: 'var(--muted)' }}>Nosotros</Link>
              <Link to="/contact" style={{ color: 'var(--muted)' }}>Contacto</Link>
            </div>
          </div>

          <div>
            <h5>Información de Contacto</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <FiMapPin style={iconStyle} />
                <div>
                  <div style={{ fontWeight: 700 }}>Dirección</div>
                  <a href="https://maps.app.goo.gl/2qcT5tGddjV2JkwGA" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)' }}>Ver ubicación en Google Maps</a>
                </div>
              </li>

              <li style={{ display: 'flex', alignItems: 'center' }}>
                <FiPhone style={iconStyle} />
                <div>
                  <div style={{ fontWeight: 700 }}>Teléfono</div>
                  <a href="tel:+50557079251" style={{ color: 'var(--muted)' }}>+505 57079251</a>
                </div>
              </li>

              <li style={{ display: 'flex', alignItems: 'center' }}>
                <FiMail style={iconStyle} />
                <div>
                  <div style={{ fontWeight: 700 }}>Email</div>
                  <a href="mailto:vallecristopher102@gmail.com" style={{ color: 'var(--muted)' }}>vallecristopher102@gmail.com</a>
                </div>
              </li>

              <li style={{ display: 'flex', alignItems: 'center' }}>
                <FiClock style={iconStyle} />
                <div>
                  <div style={{ fontWeight: 700 }}>Horario</div>
                  <div style={{ color: 'var(--muted)' }}>Lun-Vie: 8:00 - 5:00<br />Sábados: 9:00 - 4:00</div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h5>Síguenos en Redes</h5>
            <a href="https://wa.me/50581663656" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'var(--muted-bg)', color: 'var(--text)', borderRadius: 6, textDecoration: 'none' }}>
              <FaWhatsapp style={{ color: '#25D366' }} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
