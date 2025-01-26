import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const TambahMahasiswa = ({ onTambah }) => {
  const [nama, setNama] = useState('')
  const [nim, setNim] = useState('')
  const [email, setEmail] = useState('')
  const [prodi, setProdi] = useState('')
  const [alamat, setAlamat] = useState('')

  const handleProdiChange = (e) => setProdi(e.target.value)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newMahasiswa = {
      id: uuidv4(),
      nama,
      nim,
      email,
      prodi,
      alamat,
    }

    onTambah(newMahasiswa)
    navigate('/')
  }

  return (
    <div className="container mx-auto mt-8 p-4 bg-white dark:bg-zinc-800 dark:text-white rounded-lg shadow-lg max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">Tambah Mahasiswa</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-bold mb-2">
            Nama
          </label>
          <input id="nama" type="text" className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan Nama" required />
        </div>
        <div className="mb-4">
          <label htmlFor="nim" className="block text-sm font-bold mb-2">
            NIM
          </label>
          <input id="nim" type="text" className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" value={nim} onChange={(e) => setNim(e.target.value)} placeholder="Masukkan NIM" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input id="email" type="email" className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Email" required />
        </div>
        <div className="mb-4">
          <label htmlFor="prodi" className="block text-sm font-bold mb-2">
            Program Studi
          </label>
          <select value={prodi} onChange={handleProdiChange} className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white" required>
            <option value="all">Semua Prodi</option>
            <option value="Informatika">Informatika</option>
            <option value="Sains Data">Sains Data</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="alamat" className="block text-sm font-bold mb-2">
            Alamat
          </label>
          <textarea
            id="alamat"
            className="w-full px-4 py-2 rounded-lg bg-amber-400 text-zinc-800 dark:bg-zinc-700 dark:text-white"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            placeholder="Masukkan Alamat"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Tambah
        </button>
      </form>
    </div>
  )
}

TambahMahasiswa.propTypes = {
  onTambah: PropTypes.func.isRequired,
}

export default TambahMahasiswa
