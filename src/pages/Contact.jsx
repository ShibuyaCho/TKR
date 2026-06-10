import { useState } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import styles from './Contact.module.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '', list: false })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>Get in touch</span>
          <h1 className={styles.title}>Ready to buy or sell?</h1>
          <p className={styles.sub}>
            Whether you're looking to list a license, find a business, or just explore your options —
            The Kush Report team is here to help.
          </p>

          <div className={styles.contactItems}>
            <div className={styles.contactItem}>
              <Phone size={16} color="var(--gold)"/>
              <a href="tel:5418907631">541-890-7631</a>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} color="var(--gold)"/>
              <a href="mailto:tkrsummer@gmail.com">tkrsummer@gmail.com</a>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} color="var(--gold)"/>
              <span>Oregon, USA</span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {sent ? (
            <div className={styles.success}>
              <p className={styles.successIcon}>✓</p>
              <h2>Message sent</h2>
              <p>We'll be in touch within 1 business day.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Your name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Jane Smith" />
                </div>
                <div className={styles.field}>
                  <label>Email *</label>
                  <input type="email" required value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="jane@example.com" />
                </div>
              </div>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Phone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} placeholder="541-555-0100" />
                </div>
                <div className={styles.field}>
                  <label>I am interested in</label>
                  <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))}>
                    <option value="">Select…</option>
                    <option value="buying">Buying a license / business</option>
                    <option value="selling">Selling a license / business</option>
                    <option value="both">Both buying and selling</option>
                    <option value="info">General information</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label>Message</label>
                <textarea rows={5} value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} placeholder="Tell us about what you're looking for or what you'd like to sell…" />
              </div>
              <div className={styles.checkRow}>
                <input type="checkbox" id="list" checked={form.list} onChange={e => setForm(p => ({...p, list: e.target.checked}))} />
                <label htmlFor="list">I'm interested in listing my property on The Kush Report</label>
              </div>
              <button type="submit" className={styles.btnSend}>Send message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
