import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa6'
import InteractiveBackground from './ui/interactive-background'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const { login, loading, error, clearError, user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Handle navigation after successful login
  useEffect(() => {
    if (loginSuccess && user) {
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/chatbot')
      }
      setLoginSuccess(false)
    }
  }, [loginSuccess, user, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    
    try {
      await login({
        username: formData.username,
        password: formData.password
      })
      
      // Set login success flag to trigger navigation in useEffect
      setLoginSuccess(true)
    } catch (error) {
      // Error is handled by the auth context
      console.error('Login failed:', error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <InteractiveBackground />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111111]/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa]/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Log in to your CampusHive account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#60a5fa] focus:ring-[#60a5fa] border-gray-600 rounded bg-[#1a1a1a]"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <a 
                  href="#" 
                  className="text-sm text-[#60a5fa] hover:text-[#60a5fa]/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#60a5fa] hover:bg-[#60a5fa]/90 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-[#60a5fa] focus:ring-offset-2 focus:ring-offset-[#111111] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-[#60a5fa] hover:text-[#60a5fa]/80 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login