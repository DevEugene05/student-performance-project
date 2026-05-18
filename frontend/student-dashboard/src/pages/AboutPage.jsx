import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">About</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Why a multi-page architecture matters
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          Multi-page applications help you organize features into distinct areas: home, dashboard, prediction workflow, results, and about pages. That makes the project easier to maintain and scale.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Project folders</h2>
          <p className="mt-4 text-slate-300 leading-7">
            Use a folder structure that separates pages from components and services. This keeps each part of the app focused and reusable while supporting future feature growth.
          </p>
          <ul className="mt-6 space-y-3 text-slate-300">
            <li>• <strong>src/pages</strong> — page-level views for routing</li>
            <li>• <strong>src/components</strong> — reusable UI pieces</li>
            <li>• <strong>src/services</strong> — API and backend integration</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Backend plan</h2>
          <p className="mt-4 text-slate-300 leading-7">
            The Express backend receives student JSON data, processes prediction requests, and returns results. Later you can wire it to a real ML model or a database.
          </p>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="font-semibold text-white">Future enhancements:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Integrate a database for users and student records</li>
              <li>Replace stub logic with a real ML model or API</li>
              <li>Add authentication for login/register flows</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-slate-300 shadow-xl shadow-black/20">
        <h2 className="text-2xl font-semibold text-white">Ready for the next step?</h2>
        <p className="mt-4 leading-7">
          Continue building the prediction page and connect the backend route located in <code className="rounded bg-slate-800 px-2 py-1">backend/server.js</code>. Then add a database and model when you are ready.
        </p>
        <Link
          to="/predict"
          className="mt-8 inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Try the Form
        </Link>
      </div>
    </section>
  )
}

export default AboutPage
