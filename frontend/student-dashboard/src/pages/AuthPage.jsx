import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

function AuthPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  if (isAuthenticated) {
    return (
      <section className="mx-auto max-w-4xl py-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Authentication</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          You are already logged in!
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          Go to the dashboard to view student predictions and insights.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-8 inline-flex rounded-full bg-indigo-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Go to Dashboard
        </button>
      </section>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        login(email, password)
      } else {
        register(email, password, confirmPassword)
      }

      // Redirect to dashboard on success
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-4xl py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Authentication</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {mode === 'login' ? 'Login to your account' : 'Create a new account'}
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          {mode === 'login' 
            ? 'Sign in to access the student prediction dashboard and view insights.'
            : 'Register to get started with the student performance prediction system.'}
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
        <div className="flex flex-wrap gap-4">
          {['login', 'register'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setMode(tab)
                setError('')
                setPassword('')
                setConfirmPassword('')
              }}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                mode === tab ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {tab === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-900/30 border border-red-700 px-4 py-3 text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              required
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              required
              disabled={loading}
            />
          </label>

          {mode === 'register' && (
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
                required
                disabled={loading}
              />
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-indigo-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AuthPage
