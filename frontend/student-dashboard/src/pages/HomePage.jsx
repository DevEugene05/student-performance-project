import { Link } from 'react-router-dom'

const features = [
  { title: 'Personalized Predictions', description: 'Generate student performance results based on attendance, grades, and study habits.' },
  { title: 'Clean Navigation', description: 'Separate pages for Home, Dashboard, Prediction, Results, About, and Auth.' },
  { title: 'Responsive UI', description: 'Built with Tailwind CSS and a mobile-friendly layout.' },
  { title: 'Scalable Architecture', description: 'A folder-based structure that grows with your project.' },
]

const metrics = [
  { value: '1K+', label: 'Students Evaluated' },
  { value: '95%', label: 'System Accuracy' },
  { value: '24/7', label: 'Dashboard Access' },
  { value: '5+', label: 'Future Pages Ready' },
]

function HomePage() {
  return (
    <section className="mx-auto max-w-7xl py-16">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Student Prediction Web App</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Build a multi-page Student Performance prediction app with React and Express.
          </h1>
          <p className="mt-6 max-w-xl text-slate-300 leading-8 text-lg">
            This app is organized with separate pages for clean navigation, reusable components, and a strong foundation for machine learning integration.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/predict"
              className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Go to Prediction
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-8 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-400 hover:text-white"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
              <p className="text-4xl font-extrabold text-white">{metric.value}</p>
              <p className="mt-3 text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 grid gap-8 lg:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 transition hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-white">{feature.title}</h2>
            <p className="mt-4 text-slate-300 leading-7">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomePage
