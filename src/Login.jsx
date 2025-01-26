import { useState } from 'react'
import PropTypes from 'prop-types'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style/Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const credentials = {
    fullname: 'Admin Nap',
    username: 'admin',
    password: 'admin123',
  }

  const handleLogin = () => {
    if (username === credentials.username && password === credentials.password) {
      const userData = { username, fullname: credentials.fullname }
      localStorage.setItem('authUser', JSON.stringify(userData))
      onLogin(userData)
    } else {
      setError('Username atau password salah.')
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-4xl bg-zinc-900 rounded-lg shadow-lg">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
            <h2 className="text-xl font-bold text-white mb-4">This Project is made with</h2>
            <div className="flex items-center gap-5 justify-center">
              <div>
                <img src={reactLogo} alt="react logo" className="h-12 logo mb-2" />
                <p className="text-sm font-bold text-center text-white">React</p>
              </div>
              <div>
                <img src={viteLogo} alt="vite logo" className="h-12 logo mb-2" />
                <p className="text-sm font-bold text-center text-white">Vite</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-zinc-800 p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
            <form className="rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-slate-200 text-sm font-bold mb-2">Username</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-slate-200 text-sm font-bold mb-2">Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-200 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleLogin}>
                  Sign In
                </button>
                <button
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  onClick={() => {
                    alert('Belum ada fitur Register')
                  }}
                >
                  Don&apos;t have an account?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func,
}

export default Login
