import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import styles from './ListingForm.module.css'

const EMPTY = {
  title: '',
  type: 'retail',
  price: '',
  location: '',
  region: 'statewide',
  description: '',
  contact: '541-890-7631',
  status: 'active',
  featured: false,
  images: [],
}

export default function ListingForm() {
  const { id } = useParams()
  const { listings, isAdmin, addListing, updateListing } = useApp()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [imgError, setImgError] = useState('')

  useEffect(() => {
    if (isEdit) {
      const existing = listings.find(l => l.id === id)
      if (existing) setForm({ ...EMPTY, ...existing })
    }
  }, [id])

  if (!isAdmin) { navigate('/login'); return null }

  function set(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files)
    setImgError('')
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setImgError('Images must be under 5MB each.')
        return
      }
      const reader = new FileReader()
      reader.onload = ev => {
        setForm(prev => ({ ...prev, images: [...prev.images, ev.target.result] }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  function removeImage(idx) {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    if (isEdit) {
      updateListing(id, form)
      navigate(`/listing/${id}`)
    } else {
      const newId = addListing(form)
      navigate(`/listing/${newId}`)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/admin" className={styles.back}><ArrowLeft size={14}/> Back to admin</Link>
        <h1 className={styles.title}>{isEdit ? 'Edit listing' : 'Add new listing'}</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Listing title *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="e.g. OLCC Retail Dispensary — Salem, OR"
                required
              />
            </div>
            <div className={styles.field}>
              <label>Asking price *</label>
              <input
                type="text"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="e.g. $250,000 or Contact for pricing"
                required
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>License / business type *</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="retail">Retail</option>
                <option value="producer">Producer</option>
                <option value="processor">Processor</option>
                <option value="wholesale">Wholesale</option>
                <option value="real-estate">Real Estate</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => set('location', e.target.value)}
                placeholder="e.g. Salem, OR"
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Region</label>
              <select value={form.region} onChange={e => set('region', e.target.value)}>
                <option value="statewide">Statewide / Oregon</option>
                <option value="portland">Portland Metro</option>
                <option value="salem">Salem / Vicinity</option>
                <option value="eugene">Eugene / Springfield</option>
                <option value="southern">Southern Oregon</option>
                <option value="central">Central Oregon</option>
                <option value="coast">Oregon Coast</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Contact phone</label>
              <input
                type="text"
                value={form.contact}
                onChange={e => set('contact', e.target.value)}
                placeholder="541-890-7631"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={5}
              placeholder="Describe the listing — license status, business details, what's included, condition, reason for selling, etc."
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive (hidden)</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Featured listing</label>
              <div className={styles.checkRow}>
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => set('featured', e.target.checked)}
                />
                <label htmlFor="featured" className={styles.checkLabel}>Show "Featured" badge on listing</label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className={styles.field}>
            <label>Photos</label>
            <div className={styles.uploadArea}>
              <input
                type="file"
                accept="image/*"
                multiple
                id="img-upload"
                className={styles.fileInput}
                onChange={handleImageUpload}
              />
              <label htmlFor="img-upload" className={styles.uploadBtn}>
                <Upload size={16}/>
                Upload photos
              </label>
              <span className={styles.uploadHint}>JPG, PNG, WEBP — max 5MB each</span>
            </div>
            {imgError && <p className={styles.imgError}>{imgError}</p>}
            {form.images.length > 0 && (
              <div className={styles.thumbGrid}>
                {form.images.map((img, i) => (
                  <div key={i} className={styles.thumb}>
                    <img src={img} alt="" />
                    <button type="button" className={styles.removeImg} onClick={() => removeImage(i)}>
                      <X size={12}/>
                    </button>
                    {i === 0 && <span className={styles.mainLabel}>Main</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.formActions}>
            <Link to="/admin" className={styles.btnCancel}>Cancel</Link>
            <button type="submit" className={styles.btnSave} disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Publish listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
