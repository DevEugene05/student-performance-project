import { useState } from 'react'

function AuthPage() {
  const [mode, setMode] = useState('login')

  return (
    <section className="mx-auto max-w-4xl py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Authentication</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Login or register when you are ready.
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          This starter page is optional for now. Add real auth once your backend and database are ready.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
        <div className="flex flex-wrap gap-4">
          {['login', 'register'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMode(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                mode === tab ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {tab === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        <form className="mt-10 grid gap-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              required
            />
          </label>

          {mode === 'register' && (
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm your password"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
                required
              />
            </label>
          )}

          <button
            type="submit"
            className="rounded-full bg-indigo-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AuthPage
