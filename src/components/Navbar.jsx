import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Sun as LightIcon, Moon as DarkIcon, Monitor as SystemIcon, ChevronDown } from 'lucide-react'

const Navbar = ({ fullname, onLogout, onThemeChange, theme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleThemeDropdown = () => {
    setIsThemeDropdownOpen(!isThemeDropdownOpen)
  }

  const themeIcons = {
    light: <LightIcon className="h-5 w-5" />,
    dark: <DarkIcon className="h-5 w-5" />,
    system: <SystemIcon className="h-5 w-5" />,
  }

  return (
    <nav className="bg-amber-400 dark:bg-zinc-800 text-white dark:text-white py-3 shadow-md px-4 rounded-lg lg:mt-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={toggleThemeDropdown} className="flex items-center gap-2 px-3 py-2 bg-amber-500 dark:bg-zinc-700 rounded-lg">
              {themeIcons[theme]}
              <ChevronDown className="h-4 w-4" />
            </button>

            {isThemeDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-amber-400 dark:bg-zinc-700 rounded-lg shadow-lg z-50">
                {['system', 'light', 'dark'].map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => {
                      onThemeChange(themeOption)
                      setIsThemeDropdownOpen(false)
                    }}
                    className="w-full flex items-center rounded-lg gap-2 px-4 py-2 hover:bg-amber-200 dark:hover:bg-zinc-600"
                  >
                    {themeIcons[themeOption]}
                    <span className="capitalize">{themeOption}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-lg font-bold">
            <a href="/" className="hover:text-zinc-700 dark:hover:text-zinc-600">
              Dashboard
            </a>
          </div>
        </div>

        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white dark:bg-zinc-700 dark:text-white rounded-lg dark:hover:bg-zinc-600 focus:outline-none">
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
            <div className="absolute right-0 mt-2 w-48 bg-amber-400 text-white dark:bg-zinc-600 dark:text-black rounded-lg shadow-lg z-50">
              <Link to="/profile">
                <button className="w-full text-left px-4 py-2 hover:bg-slate-200 hover:text-amber-400 dark:hover:bg-zinc-500 dark:hover:text-white rounded-lg text-white">Profile</button>
              </Link>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 hover:bg-slate-200 hover:text-amber-400 dark:hover:bg-zinc-500 dark:hover:text-white rounded-lg text-white">
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
  onThemeChange: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}

export default Navbar
