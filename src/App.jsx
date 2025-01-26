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
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser')
    const storedMahasiswa = localStorage.getItem('mahasiswa') || '[]'
    if (storedUser) setUser(JSON.parse(storedUser))
    setMahasiswa(JSON.parse(storedMahasiswa))
    setLoading(false)
  }, [])

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
      {user && <Navbar fullname={user.fullname} onLogout={handleLogout} />}
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
