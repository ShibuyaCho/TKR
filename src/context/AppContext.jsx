import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'tkr2025'

const SAMPLE_LISTINGS = [
  {
    id: '1',
    title: 'OLCC Wholesale License',
    type: 'wholesale',
    price: '$25,000',
    location: 'Oregon',
    region: 'statewide',
    description: 'Active OLCC wholesale distribution license in good standing. Ready for immediate transfer. Includes all required documentation and compliance history.',
    contact: '541-890-7631',
    status: 'active',
    featured: true,
    images: [],
    createdAt: new Date('2025-01-10').toISOString(),
  },
  {
    id: '2',
    title: 'Retail Dispensary — Turn-key',
    type: 'retail',
    price: '$300,000',
    location: 'Salem, OR',
    region: 'salem',
    description: 'Fully operational OLCC licensed retail dispensary with established customer base. Includes all equipment, inventory system, and lease. Owner motivated to sell.',
    contact: '541-890-7631',
    status: 'active',
    featured: true,
    images: [],
    createdAt: new Date('2025-01-15').toISOString(),
  },
  {
    id: '3',
    title: 'Tier 1 Indoor Producer & Processor',
    type: 'producer',
    price: 'Contact for pricing',
    location: 'Portland, OR',
    region: 'portland',
    description: 'Established indoor cultivation operation with producer and processor licenses. 2,500 sq ft canopy. Full buildout included.',
    contact: '541-890-7631',
    status: 'active',
    featured: false,
    images: [],
    createdAt: new Date('2025-02-01').toISOString(),
  },
  {
    id: '4',
    title: 'OLCC Processor License',
    type: 'processor',
    price: '$45,000',
    location: 'Oregon',
    region: 'statewide',
    description: 'Clean OLCC processor license with no violations. Suitable for extraction, infused products, or concentrates operations.',
    contact: '541-890-7631',
    status: 'active',
    featured: false,
    images: [],
    createdAt: new Date('2025-02-10').toISOString(),
  },
]

export function AppProvider({ children }) {
  const [listings, setListings] = useState(() => {
    try {
      const stored = localStorage.getItem('tkr_listings')
      return stored ? JSON.parse(stored) : SAMPLE_LISTINGS
    } catch { return SAMPLE_LISTINGS }
  })

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('tkr_admin') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('tkr_listings', JSON.stringify(listings))
  }, [listings])

  function login(user, pass) {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAdmin(true)
      localStorage.setItem('tkr_admin', 'true')
      return true
    }
    return false
  }

  function logout() {
    setIsAdmin(false)
    localStorage.removeItem('tkr_admin')
  }

  function addListing(listing) {
    const newListing = {
      ...listing,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setListings(prev => [newListing, ...prev])
    return newListing.id
  }

  function updateListing(id, updates) {
    setListings(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l))
  }

  function deleteListing(id) {
    setListings(prev => prev.filter(l => l.id !== id))
  }

  const activeListings = listings.filter(l => l.status === 'active')

  return (
    <AppContext.Provider value={{
      listings, activeListings, isAdmin,
      login, logout,
      addListing, updateListing, deleteListing,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
