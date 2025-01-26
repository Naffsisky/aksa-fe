import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function Dashboard({ mahasiswa, onDelete }) {
  const [search, setSearch] = useSearchParams()
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage] = useState(1)
  const navigate = useNavigate()

  const filteredMahasiswa = mahasiswa
    .filter((mhs) => {
      if (filter === 'all') return true
      return mhs.prodi.toLowerCase().includes(filter.toLowerCase())
    })
    .filter((mhs) => {
      return mhs.nama.toLowerCase().includes(search.toLowerCase()) || mhs.nim.includes(search)
    })

  const indexOfLastData = currentPage * dataPerPage
  const indexOfFirstData = indexOfLastData - dataPerPage
  const currentData = filteredMahasiswa.slice(indexOfFirstData, indexOfLastData)

  const totalPages = Math.ceil(filteredMahasiswa.length / dataPerPage)

  const handleSearchChange = (e) => setSearch(e.target.value)

  const handleFilterChange = (e) => setFilter(e.target.value)

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto mt-8 p-4 bg-zinc-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Data Mahasiswa</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4" onClick={() => navigate('/mahasiswa/tambah')}>
        Tambah Mahasiswa
      </button>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <input type="text" placeholder="Cari nama atau NIM" value={search} onChange={handleSearchChange} className="px-4 py-2 rounded-lg bg-zinc-700 text-white mb-2 md:mb-0 md:mr-2" />
        <select value={filter} onChange={handleFilterChange} className="px-4 py-2 rounded-lg bg-zinc-700 text-white">
          <option value="all">Semua Prodi</option>
          <option value="Informatika">Informatika</option>
          <option value="Sains Data">Sains Data</option>
        </select>
      </div>
      <div className="overflow-x-auto bg-zinc-700 rounded-lg shadow-lg">
        <table className="w-full my-4">
          <thead>
            <tr>
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
            {currentData.length > 0 ? (
              currentData.map((mhs, index) => (
                <tr key={mhs.id}>
                  <td className="px-4 py-2">{indexOfFirstData + index + 1}</td>
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
                    <button onClick={() => navigate(`/mahasiswa/edit/${mhs.id}`)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2">
                      Edit
                    </button>
                    <button onClick={() => onDelete(mhs.id)} className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg">
                      Hapus
                    </button>
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
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-white hover:bg-zinc-600'}`}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

Dashboard.propTypes = {
  mahasiswa: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Dashboard
