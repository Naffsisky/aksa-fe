import { useState } from 'react'
import PropTypes from 'prop-types'

const Profile = ({ user, onUpdateUser, onLogout }) => {
  const [fullname, setFullname] = useState(user.fullname)

  const handleSave = () => {
    const updatedUser = { ...user, fullname }
    if (!updatedUser.fullname) {
      alert('Nama harus diisi!')
      return
    }
    onUpdateUser(updatedUser)
    alert('Data berhasil diperbarui!')
  }

  return (
    <div className="container mx-auto mt-8 p-4 text-zinc-800 dark:bg-zinc-800 dark:text-white rounded-lg shadow-lg max-w-md">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input type="text" className="w-full px-4 py-2 rounded-lg bg-amber-400 dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 dark:focus:ring-blue-500" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold">
          Update
        </button>
      </form>
      <button onClick={onLogout} className="mt-3 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg font-bold">
        Delete Account
      </button>
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default Profile
