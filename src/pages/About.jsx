import { Link } from 'react-router-dom'
import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>About us</span>
        <h1 className={styles.title}>Oregon's cannabis real estate brokers</h1>
        <p className={styles.lead}>
          The Kush Report is a woman-owned and operated cannabis property marketplace,
          cultivated by first-generation and legacy growers with over 100 years of
          combined experience in the Oregon cannabis industry.
        </p>

        <div className={styles.divider}/>

        <div className={styles.blocks}>
          <div className={styles.block}>
            <h2>What we do</h2>
            <p>
              We connect buyers and sellers of OLCC-licensed cannabis businesses, dispensaries,
              producer farms, processors, and wholesale licenses across Oregon. From simple
              license transfers to full business sales with real estate, we handle the entire process.
            </p>
          </div>
          <div className={styles.block}>
            <h2>Who we work with</h2>
            <p>
              Owners looking to exit the industry, investors entering the market, and operators
              looking to expand. We work with licensed real estate attorneys and cannabis-friendly
              escrow agents to make every transaction smooth and compliant.
            </p>
          </div>
          <div className={styles.block}>
            <h2>Our approach</h2>
            <p>
              No lock-in contracts. If someone else sells your business faster, we'll be the first
              to congratulate you. Our goal is to get you the best outcome — not to tie you down.
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <h2>Ready to get started?</h2>
          <p>Contact us for a free consultation on buying or selling.</p>
          <div className={styles.ctaBtns}>
            <Link to="/contact" className={styles.btnGold}>Contact us</Link>
            <Link to="/" className={styles.btnOutline}>View listings</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
