import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ListingDetail from './pages/ListingDetail'
import Login from './pages/Login'
import Admin from './pages/Admin'
import ListingForm from './pages/ListingForm'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/new" element={<ListingForm />} />
            <Route path="/admin/edit/:id" element={<ListingForm />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  )
}
