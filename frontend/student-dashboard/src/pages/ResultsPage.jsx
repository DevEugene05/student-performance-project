import { Link, useLocation } from 'react-router-dom'
import { formatGradeLabel } from '../services/api.js'

function ResultsPage() {
  const location = useLocation()
  const savedResult = location.state || JSON.parse(localStorage.getItem('latestPrediction'))

  if (!savedResult) {
    return (
      <section className="mx-auto max-w-4xl py-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Results</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          No prediction available yet
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          Please complete the prediction form first so the backend can process the data and return a result.
        </p>
        <Link
          to="/predict"
          className="mt-10 inline-flex rounded-full bg-indigo-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Go to Prediction Page
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Prediction Results</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Student performance prediction summary
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          The prediction result is stored in local storage so it remains available while you enhance the app.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Prediction</p>
          <p className="mt-3 text-5xl font-extrabold text-white">{savedResult.prediction}</p>
          <p className="mt-4 text-lg text-slate-300">{formatGradeLabel(savedResult.prediction)}</p>
          <div className="mt-8 space-y-4 text-slate-300">
            <p><span className="font-semibold text-white">Label:</span> {savedResult.label}</p>
            <p><span className="font-semibold text-white">Generated:</span> {new Date(savedResult.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Student Inputs</p>
          <div className="mt-6 grid gap-4">
            {['admission_grade', 'previous_qualification_grade', 'age_at_enrollment', 'curricular_units_1st_sem_grade', 'curricular_units_2nd_sem_grade', 'unemployment_rate', 'inflation_rate', 'gdp'].map((field) => (
              <div key={field} className="rounded-2xl bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{field}</p>
                <p className="mt-2 text-lg font-semibold text-white">{savedResult[field]}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Rule-based interventions</p>
            <div className="mt-4 space-y-3">
              {(savedResult.interventions || []).map((intervention, index) => (
                <div key={`${intervention.title}-${index}`} className="rounded-2xl border border-indigo-500/20 bg-slate-900/70 p-4">
                  <p className="text-sm font-semibold text-white">{intervention.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{intervention.message}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Priority: {intervention.priority}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/predict"
            className="mt-8 inline-flex rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Predict Again
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ResultsPage
