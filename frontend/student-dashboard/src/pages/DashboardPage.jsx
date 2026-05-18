import { Link } from 'react-router-dom'

const stats = [
  { label: 'Average Grade', value: '14.2 / 20' },
  { label: 'At-Risk Students', value: '18%' },
  { label: 'Attendance Rate', value: '89%' },
  { label: 'Support Recommendations', value: '12' },
]

function DashboardPage() {
  return (
    <section className="mx-auto max-w-7xl py-16">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Dashboard</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          At-a-glance student performance insights
        </h1>
        <p className="mt-6 max-w-3xl text-slate-300 leading-8">
          This dashboard page offers a scalable place for charts, student metrics, and predictive summaries.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-inner shadow-black/20">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
            <p className="mt-6 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Academic Risk Summary</h2>
          <p className="mt-4 text-slate-300 leading-7">
            Add charts and data visualizations here later to help administrators compare student segments and identify trends.
          </p>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Low risk</p>
              <p className="mt-2 text-lg font-semibold text-white">72% of students</p>
            </div>
            <div className="rounded-3xl bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Medium risk</p>
              <p className="mt-2 text-lg font-semibold text-white">18% of students</p>
            </div>
            <div className="rounded-3xl bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">High risk</p>
              <p className="mt-2 text-lg font-semibold text-white">10% of students</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Next Steps</h2>
          <p className="mt-4 text-slate-300 leading-7">
            Later you can connect this page to a backend database and add charts for attendance, grades, and prediction accuracy over time.
          </p>

          <Link
            to="/predict"
            className="mt-8 inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Go to Prediction Form
          </Link>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
