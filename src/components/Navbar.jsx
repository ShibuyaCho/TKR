import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { isAdmin, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoMark}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#c9a84c" strokeWidth="1.2"/>
            <circle cx="12" cy="12" r="6" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="2 2"/>
            <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="600" fill="#c9a84c" fontFamily="system-ui">TKR</text>
          </svg>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoMain}>The Kush Report</span>
          <span className={styles.logoSub}>Oregon Cannabis Marketplace</span>
        </div>
      </Link>

      <div className={styles.links}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Listings</Link>
        <Link to="/about" className={location.pathname === '/about' ? styles.active : ''}>About</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? styles.active : ''}>Contact</Link>
        {isAdmin && (
          <Link to="/admin" className={location.pathname.startsWith('/admin') ? styles.active : ''}>Admin</Link>
        )}
      </div>

      <div className={styles.actions}>
        {isAdmin ? (
          <button className={styles.btnOutline} onClick={handleLogout}>Sign out</button>
        ) : (
          <Link to="/contact" className={styles.btnGold}>List your property</Link>
        )}
      </div>
    </nav>
  )
}
