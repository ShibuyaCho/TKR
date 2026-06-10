import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import styles from './Admin.module.css'

const TYPE_LABELS = {
  retail: 'Retail', producer: 'Producer', processor: 'Processor',
  wholesale: 'Wholesale', 'real-estate': 'Real Estate',
}

export default function Admin() {
  const { listings, isAdmin, deleteListing, updateListing } = useApp()
  const navigate = useNavigate()

  if (!isAdmin) {
    navigate('/login')
    return null
  }

  function toggleStatus(listing) {
    updateListing(listing.id, {
      status: listing.status === 'active' ? 'inactive' : 'active'
    })
  }

  function handleDelete(id, title) {
    if (confirm(`Delete "${title}"?`)) {
      deleteListing(id)
    }
  }

  const active = listings.filter(l => l.status === 'active').length
  const inactive = listings.filter(l => l.status !== 'active').length

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Listings</h1>
          <p className={styles.sub}>{active} active · {inactive} inactive</p>
        </div>
        <Link to="/admin/new" className={styles.btnNew}>
          <Plus size={14}/> Add listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className={styles.empty}>
          <p>No listings yet.</p>
          <Link to="/admin/new" className={styles.btnNew} style={{ marginTop: '1rem' }}>
            <Plus size={14}/> Add your first listing
          </Link>
        </div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Title</span>
            <span>Type</span>
            <span>Price</span>
            <span>Location</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {listings.map(listing => (
            <div key={listing.id} className={styles.row}>
              <span className={styles.rowTitle}>
                <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
              </span>
              <span><span className={styles.typePill}>{TYPE_LABELS[listing.type] || listing.type}</span></span>
              <span className={styles.price}>{listing.price}</span>
              <span className={styles.muted}>{listing.location}</span>
              <span>
                <span className={`${styles.statusPill} ${listing.status === 'active' ? styles.active : styles.inactive}`}>
                  {listing.status}
                </span>
              </span>
              <span className={styles.actions}>
                <button
                  title={listing.status === 'active' ? 'Deactivate' : 'Activate'}
                  className={styles.iconBtn}
                  onClick={() => toggleStatus(listing)}
                >
                  {listing.status === 'active' ? <EyeOff size={14}/> : <Eye size={14}/>}
                </button>
                <Link to={`/admin/edit/${listing.id}`} className={styles.iconBtn} title="Edit">
                  <Edit2 size={14}/>
                </Link>
                <button
                  className={`${styles.iconBtn} ${styles.danger}`}
                  title="Delete"
                  onClick={() => handleDelete(listing.id, listing.title)}
                >
                  <Trash2 size={14}/>
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
