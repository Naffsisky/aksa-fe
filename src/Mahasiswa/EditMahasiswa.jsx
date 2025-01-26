import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const EditMahasiswa = ({ mahasiswa, onEdit }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: '',
    prodi: '',
    alamat: '',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    const mahasiswaToEdit = mahasiswa.find((m) => m.id === id)
    if (mahasiswaToEdit) {
      setFormData(mahasiswaToEdit)
    } else {
      setError('Data mahasiswa tidak ditemukan.')
    }
  }, [id, mahasiswa])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nama || !formData.nim || !formData.email || !formData.prodi || !formData.alamat) {
      setError('Semua field harus diisi.')
      return
    }
    onEdit(id, formData)
    alert('Data berhasil diperbarui!')
    navigate('/')
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 p-4 bg-zinc-800 text-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4" onClick={() => navigate('/')}>
          Kembali ke Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto mt-8 p-4 bg-white dark:bg-zinc-800 dark:text-white rounded-lg shadow-lg max-w-md">
      <h1 className="text-2xl font-bold mb-4">Edit Mahasiswa</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-bold mb-2">
            Nama
          </label>
          <input id="nama" name="nama" type="text" className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" value={formData.nama} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="nim" className="block text-sm font-bold mb-2">
            NIM
          </label>
          <input id="nim" name="nim" type="text" className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" value={formData.nim} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input id="email" name="email" type="email" className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="prodi" className="block text-sm font-bold mb-2">
            Program Studi
          </label>
          <select id="prodi" name="prodi" value={formData.prodi} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" required>
            <option value="">Pilih Program Studi</option>
            <option value="Informatika">Informatika</option>
            <option value="Sains Data">Sains Data</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="alamat" className="block text-sm font-bold mb-2">
            Alamat
          </label>
          <textarea id="alamat" name="alamat" className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" value={formData.alamat} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Simpan Perubahan
        </button>
        <button type="button" className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg ml-4" onClick={() => navigate('/')}>
          Batal
        </button>
      </form>
    </div>
  )
}

EditMahasiswa.propTypes = {
  mahasiswa: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default EditMahasiswa
