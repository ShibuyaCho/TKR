import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ListingCard from '../components/ListingCard'
import styles from './Home.module.css'

const FILTERS = [
  { key: 'all', label: 'All listings' },
  { key: 'retail', label: 'Retail' },
  { key: 'producer', label: 'Producer' },
  { key: 'processor', label: 'Processor' },
  { key: 'wholesale', label: 'Wholesale' },
  { key: 'real-estate', label: 'Real Estate' },
]

export default function Home() {
  const { activeListings } = useApp()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? activeListings
    : activeListings.filter(l => l.type === filter)

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>Oregon's cannabis marketplace</div>
        <h1 className={styles.heroH1}>
          Buy or sell a cannabis<br />
          <span className={styles.gold}>license or business</span>
        </h1>
        <p className={styles.heroP}>
          The Kush Report connects buyers and sellers of Oregon dispensaries,
          grows, processors, and wholesale licenses.
        </p>
        <div className={styles.heroBtns}>
          <a href="#listings" className={styles.btnGold}>Browse listings</a>
          <Link to="/contact" className={styles.btnOutline}>List your property</Link>
        </div>
      </section>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{activeListings.length}</span>
          <span className={styles.statLabel}>Active listings</span>
        </div>
        <div className={styles.statDiv} />
        <div className={styles.stat}>
          <span className={styles.statNum}>50+</span>
          <span className={styles.statLabel}>Years combined experience</span>
        </div>
        <div className={styles.statDiv} />
        <div className={styles.stat}>
          <span className={styles.statNum}>OR</span>
          <span className={styles.statLabel}>Licensed & operating</span>
        </div>
      </div>

      {/* Listings */}
      <section className={styles.listings} id="listings">
        <div className={styles.listingsHeader}>
          <h2 className={styles.listingsTitle}>Cannabis businesses &amp; licenses for sale</h2>
          <span className={styles.listingsCount}>{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        <div className={styles.filterRow}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.tab} ${filter === f.key ? styles.tabActive : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No {filter === 'all' ? '' : filter} listings at this time.</p>
            <Link to="/contact" className={styles.btnGold} style={{ display: 'inline-block', marginTop: '1rem' }}>
              Contact us about upcoming listings
            </Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Ready to sell your license or business?</h2>
        <p>Get a free consultation. We handle valuation, marketing, and closing.</p>
        <Link to="/contact" className={styles.btnGold}>Get started</Link>
      </section>
    </div>
  )
}
