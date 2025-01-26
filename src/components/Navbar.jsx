import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = ({ fullname, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <nav className="bg-zinc-800 text-white py-3 shadow-md px-4 rounded-lg lg:mt-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <a href="/">Dashboard</a>
        </div>

        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center gap-2 px-4 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 focus:outline-none">
            <span className="font-semibold capitalize">{fullname}</span>
            {isDropdownOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-600 text-black rounded-lg shadow-lg z-50">
              <Link to="/profile">
                <button className="w-full text-left px-4 py-2 hover:bg-zinc-500 rounded-lg text-white">Profile</button>
              </Link>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 hover:bg-zinc-500 rounded-lg text-white">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  fullname: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default Navbar
