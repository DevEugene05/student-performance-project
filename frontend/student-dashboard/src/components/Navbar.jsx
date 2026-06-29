import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Predict', path: '/predict' },
  { label: 'Results', path: '/results' },
  { label: 'About', path: '/about' },
  { label: 'Login / Register', path: '/auth' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-white">
          EduPredict
        </NavLink>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-900 p-2 text-slate-200 transition hover:bg-slate-800 md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-white border-b-2 border-indigo-400 pb-0.5' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/predict"
          className="hidden rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 md:inline-flex"
        >
          Start Prediction
        </NavLink>
      </div>

      <div className={`${menuOpen ? 'block' : 'hidden'} border-t border-white/10 bg-slate-950/95 md:hidden`}>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
