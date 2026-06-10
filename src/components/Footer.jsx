import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoMark}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#c9a84c" strokeWidth="1.2"/>
              <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="600" fill="#c9a84c" fontFamily="system-ui">TKR</text>
            </svg>
          </div>
          <span className={styles.brandName}>The Kush Report</span>
        </div>

        <div className={styles.links}>
          <Link to="/">Listings</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Admin</Link>
        </div>

        <div className={styles.copy}>
          <a href="tel:5418907631">541-890-7631</a>
          <span>·</span>
          <a href="mailto:tkrsummer@gmail.com">tkrsummer@gmail.com</a>
          <span>·</span>
          <span>© {new Date().getFullYear()} The Kush Report</span>
        </div>
      </div>
    </footer>
  )
}
