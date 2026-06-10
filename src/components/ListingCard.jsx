import { Link } from 'react-router-dom'
import { MapPin, Tag } from 'lucide-react'
import styles from './ListingCard.module.css'

const TYPE_LABELS = {
  retail: 'Retail',
  producer: 'Producer',
  processor: 'Processor',
  wholesale: 'Wholesale',
  'real-estate': 'Real Estate',
}

export default function ListingCard({ listing }) {
  const { id, title, type, price, location, images, featured } = listing

  return (
    <Link to={`/listing/${id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        {images && images.length > 0 ? (
          <img src={images[0]} alt={title} className={styles.img} />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span className={styles.placeholderIcon}>
              {type === 'retail' ? '🏪' : type === 'producer' ? '🌿' : type === 'processor' ? '⚗️' : '📦'}
            </span>
          </div>
        )}
        <span className={styles.badge}>{TYPE_LABELS[type] || type}</span>
        {featured && <span className={styles.featuredBadge}>Featured</span>}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.price}>{price}</span>
          <span className={styles.loc}>
            <MapPin size={12} />
            {location}
          </span>
        </div>
      </div>
    </Link>
  )
}
