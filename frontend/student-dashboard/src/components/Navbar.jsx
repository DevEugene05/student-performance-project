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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-white">
          EduPredict
        </NavLink>

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
          className="rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
        >
          Start Prediction
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar
