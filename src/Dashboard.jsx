import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function Dashboard({ mahasiswa, onDelete }) {
  const [search, setSearch] = useSearchParams()
  const [filter, setFilter] = useState(search.get('filter') || 'all')
  const [keyword, setKeyword] = useState(search.get('keyword') || '')
  const [currentPage, setCurrentPage] = useState(parseInt(search.get('page'), 10) || 1)

  const itemsPerPage = 2
  const filteredMahasiswa = mahasiswa.filter((mhs) => (filter === 'all' || mhs.prodi === filter) && (mhs.nama.toLowerCase().includes(keyword.toLowerCase()) || mhs.nim.includes(keyword)))
  const navigate = useNavigate()

  const totalPages = Math.ceil(filteredMahasiswa.length / itemsPerPage)
  const displayedMahasiswa = filteredMahasiswa.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    const params = {}
    if (keyword) params.keyword = keyword
    if (filter && filter !== 'all') params.filter = filter
    if (currentPage > 1) params.page = currentPage
    setSearch(params)
  }, [keyword, filter, currentPage, setSearch])

  const handleSearch = (e) => {
    setKeyword(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto mt-8 p-4 bg-zinc-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Data Mahasiswa</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4" onClick={() => navigate('/mahasiswa/tambah')}>
        Tambah Mahasiswa
      </button>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <input type="text" placeholder="Cari nama atau NIM" value={keyword} onChange={handleSearch} className="px-4 py-2 rounded-lg bg-zinc-700 text-white mb-2 md:mb-0 md:mr-2" />
        <select value={filter} onChange={handleFilterChange} className="px-4 py-2 rounded-lg bg-zinc-700 text-white">
          <option value="all">Semua Prodi</option>
          <option value="Informatika">Informatika</option>
          <option value="Sains Data">Sains Data</option>
          <option value="Sistem Informasi">Sistem Informasi</option>
        </select>
      </div>
      <div className="overflow-x-auto bg-zinc-800 rounded-lg shadow-lg">
        <table className="w-full my-4">
          <thead>
            <tr className="bg-zinc-600 text-white">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">NIM</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Prodi</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedMahasiswa.length > 0 ? (
              displayedMahasiswa.map((mhs, index) => (
                <tr key={mhs.id} className="bg-zinc-800 text-white">
                  <td className="px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-4 py-2">{mhs.nama}</td>
                  <td className="px-4 py-2">{mhs.nim}</td>
                  <td className="px-4 py-2">
                    <a href={`mailto:${mhs.email}`} className="text-blue-500 hover:underline">
                      {mhs.email}
                    </a>
                  </td>
                  <td className="px-4 py-2">{mhs.prodi}</td>
                  <td className="px-4 py-2">{mhs.alamat}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => navigate(`/mahasiswa/edit/${mhs.id}`)} className="flex-1 w-[100px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                        Edit
                      </button>
                      <button onClick={() => onDelete(mhs.id)} className="flex-1 w-[100px] bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-2">
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pt-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 rounded-lg mx-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-slate-400 hover:bg-zinc-600'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  mahasiswa: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Dashboard
