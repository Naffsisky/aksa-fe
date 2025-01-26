import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Navbar from './components/Navbar'
import Profile from './Profile'
import TambahMahasiswa from './Mahasiswa/TambahMahasiswa'
import EditMahasiswa from './Mahasiswa/EditMahasiswa'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mahasiswa, setMahasiswa] = useState([])
  const [theme, setTheme] = useState('system')
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser')
    const storedMahasiswa = localStorage.getItem('mahasiswa') || '[]'
    const storedTheme = localStorage.getItem('theme') || 'system'

    if (storedUser) setUser(JSON.parse(storedUser))
    setMahasiswa(JSON.parse(storedMahasiswa))
    setTheme(storedTheme)
    setLoading(false)
  }, [])

  useEffect(() => {
    const updateTheme = () => {
      const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const appliedTheme = theme === 'system' ? (osPrefersDark ? 'dark' : 'light') : theme
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(appliedTheme)
    }
    updateTheme()

    if (theme === 'system') {
      const listener = (e) => {
        const appliedTheme = e.matches ? 'dark' : 'light'
        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(appliedTheme)
      }
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    }
  }, [theme])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleLogin = (userData) => {
    localStorage.setItem('authUser', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('authUser')
    setUser(null)
    navigate('/login')
  }

  const handleUpdateUser = (updatedUser) => {
    localStorage.setItem('authUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const handleTambahMahasiswa = (data) => {
    const newMahasiswa = [...mahasiswa, data]
    setMahasiswa(newMahasiswa)
    localStorage.setItem('mahasiswa', JSON.stringify(newMahasiswa))
  }

  const handleEditMahasiswa = (id, updatedData) => {
    const updatedMahasiswa = mahasiswa.map((m) => (m.id === id ? updatedData : m))
    setMahasiswa(updatedMahasiswa)
    localStorage.setItem('mahasiswa', JSON.stringify(updatedMahasiswa))
  }

  const handleHapusMahasiswa = (id) => {
    const updatedMahasiswa = mahasiswa.filter((m) => m.id !== id)
    setMahasiswa(updatedMahasiswa)
    localStorage.setItem('mahasiswa', JSON.stringify(updatedMahasiswa))
  }

  if (loading) {
    return <div className="p-4 text-center text-white">Loading...</div>
  }

  return (
    <>
      {user && <Navbar fullname={user.fullname} onLogout={handleLogout} onThemeChange={handleThemeChange} theme={theme} />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
        <Route path="/profile" element={user ? <Profile user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
        <Route path="/mahasiswa/tambah" element={user ? <TambahMahasiswa onTambah={handleTambahMahasiswa} /> : <Navigate to="/login" replace />} />
        <Route path="/mahasiswa/edit/:id" element={user ? <EditMahasiswa mahasiswa={mahasiswa} onEdit={handleEditMahasiswa} /> : <Navigate to="/login" replace />} />
        <Route path="/" element={user ? <Dashboard fullname={user.fullname} mahasiswa={mahasiswa} onEdit={handleEditMahasiswa} onDelete={handleHapusMahasiswa} /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<div className="p-4">404 - Tersesat tapi bukan di hutan</div>} />
      </Routes>
    </>
  )
}

export default App
