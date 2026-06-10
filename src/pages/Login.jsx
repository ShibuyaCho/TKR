import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './Login.module.css'

export default function Login() {
  const { login, isAdmin } = useApp()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  if (isAdmin) {
    navigate('/admin')
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (login(user, pass)) {
      navigate('/admin')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoMark}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#c9a84c" strokeWidth="1.2"/>
            <circle cx="16" cy="16" r="8" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="2 2"/>
            <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="600" fill="#c9a84c" fontFamily="system-ui">TKR</text>
          </svg>
        </div>
        <h1 className={styles.title}>Admin sign in</h1>
        <p className={styles.sub}>The Kush Report dashboard</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Username</label>
            <input
              type="text"
              value={user}
              onChange={e => { setUser(e.target.value); setError('') }}
              autoComplete="username"
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setError('') }}
              autoComplete="current-password"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn}>Sign in</button>
        </form>
      </div>
    </div>
  )
}
