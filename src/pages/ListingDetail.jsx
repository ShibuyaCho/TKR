import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import styles from './ListingDetail.module.css'

const TYPE_LABELS = {
  retail: 'Retail', producer: 'Producer', processor: 'Processor',
  wholesale: 'Wholesale', 'real-estate': 'Real Estate',
}

export default function ListingDetail() {
  const { id } = useParams()
  const { listings, isAdmin, deleteListing } = useApp()
  const navigate = useNavigate()
  const [imgIndex, setImgIndex] = useState(0)

  const listing = listings.find(l => l.id === id)
  if (!listing) return (
    <div className={styles.notFound}>
      <p>Listing not found.</p>
      <Link to="/" className={styles.back}><ArrowLeft size={14}/> Back to listings</Link>
    </div>
  )

  const { title, type, price, location, description, contact, images, status, createdAt } = listing

  function handleDelete() {
    if (confirm('Delete this listing?')) {
      deleteListing(id)
      navigate('/admin')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.back}><ArrowLeft size={14}/> All listings</Link>

        <div className={styles.layout}>
          {/* Left: images */}
          <div className={styles.imageSection}>
            <div className={styles.mainImg}>
              {images && images.length > 0 ? (
                <>
                  <img src={images[imgIndex]} alt={title} className={styles.img} />
                  {images.length > 1 && (
                    <div className={styles.imgNav}>
                      <button onClick={() => setImgIndex(i => Math.max(0, i-1))} disabled={imgIndex === 0}><ChevronLeft size={16}/></button>
                      <span>{imgIndex + 1} / {images.length}</span>
                      <button onClick={() => setImgIndex(i => Math.min(images.length-1, i+1))} disabled={imgIndex === images.length-1}><ChevronRight size={16}/></button>
                    </div>
                  )}
                </>
              ) : (
                <div className={styles.imgPlaceholder}>
                  <span>{type === 'retail' ? '🏪' : type === 'producer' ? '🌿' : type === 'processor' ? '⚗️' : '📦'}</span>
                  <p>No photos uploaded</p>
                </div>
              )}
            </div>
            {images && images.length > 1 && (
              <div className={styles.thumbRow}>
                {images.map((img, i) => (
                  <button key={i} className={`${styles.thumb} ${i === imgIndex ? styles.thumbActive : ''}`} onClick={() => setImgIndex(i)}>
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className={styles.details}>
            <div className={styles.badges}>
              <span className={styles.typeBadge}>{TYPE_LABELS[type] || type}</span>
              {status === 'active' && <span className={styles.activeBadge}>Active</span>}
            </div>

            <h1 className={styles.title}>{title}</h1>
            <div className={styles.price}>{price}</div>

            <div className={styles.locRow}>
              <MapPin size={14} color="var(--text-3)"/>
              <span>{location}</span>
            </div>

            <div className={styles.divider}/>

            <h2 className={styles.sectionLabel}>About this listing</h2>
            <p className={styles.description}>{description}</p>

            <div className={styles.divider}/>

            <h2 className={styles.sectionLabel}>Contact</h2>
            <div className={styles.contactCard}>
              <div className={styles.contactRow}>
                <Phone size={14}/>
                <a href={`tel:${contact}`}>{contact}</a>
              </div>
              <div className={styles.contactRow}>
                <Mail size={14}/>
                <a href="mailto:tkrsummer@gmail.com">tkrsummer@gmail.com</a>
              </div>
            </div>

            <Link to="/contact" className={styles.btnGold}>Inquire about this listing</Link>

            {isAdmin && (
              <div className={styles.adminActions}>
                <Link to={`/admin/edit/${id}`} className={styles.btnEdit}>Edit listing</Link>
                <button className={styles.btnDelete} onClick={handleDelete}>Delete</button>
              </div>
            )}

            <p className={styles.listed}>Listed {new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
