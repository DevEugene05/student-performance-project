import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-4xl py-16 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
      <p className="mt-6 text-slate-300 leading-8">
        The page you were looking for does not exist yet. Explore the app using the navigation links.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex rounded-full bg-indigo-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
      >
        Return Home
      </Link>
    </section>
  )
}

export default NotFoundPage
