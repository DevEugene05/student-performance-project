import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { predictStudent } from '../services/api.js'

const initialState = {
  admission_grade: '',
  previous_qualification_grade: '',
  age_at_enrollment: '',
  curricular_units_1st_sem_grade: '',
  curricular_units_2nd_sem_grade: '',
  unemployment_rate: '',
  inflation_rate: '',
  gdp: '',
}

function PredictionPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    setPrediction('')

    try {
      const payload = {
        admission_grade: Number(formData.admission_grade),
        previous_qualification_grade: Number(formData.previous_qualification_grade),
        age_at_enrollment: Number(formData.age_at_enrollment),
        curricular_units_1st_sem_grade: Number(formData.curricular_units_1st_sem_grade),
        curricular_units_2nd_sem_grade: Number(formData.curricular_units_2nd_sem_grade),
        unemployment_rate: Number(formData.unemployment_rate),
        inflation_rate: Number(formData.inflation_rate),
        gdp: Number(formData.gdp),
      }

      const result = await predictStudent(payload)
      const resultPayload = {
        ...result,
        ...payload,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('latestPrediction', JSON.stringify(resultPayload))
      setPrediction(result.prediction)
      navigate('/results', { state: resultPayload })
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-4xl py-16">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Prediction Form</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Enter student profile metrics to predict the outcome.
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          Submit the values to the backend and view whether the student is classified as Dropout, Enrolled, or Graduate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Admission Grade</span>
            <input
              type="number"
              name="admission_grade"
              value={formData.admission_grade}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="140"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Previous Qualification Grade</span>
            <input
              type="number"
              name="previous_qualification_grade"
              value={formData.previous_qualification_grade}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="130"
              required
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Age at Enrollment</span>
            <input
              type="number"
              name="age_at_enrollment"
              value={formData.age_at_enrollment}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="19"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">1st Semester Grade</span>
            <input
              type="number"
              name="curricular_units_1st_sem_grade"
              value={formData.curricular_units_1st_sem_grade}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="13.4"
              required
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">2nd Semester Grade</span>
            <input
              type="number"
              name="curricular_units_2nd_sem_grade"
              value={formData.curricular_units_2nd_sem_grade}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="14.2"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Unemployment Rate</span>
            <input
              type="number"
              name="unemployment_rate"
              value={formData.unemployment_rate}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="10.8"
              required
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Inflation Rate</span>
            <input
              type="number"
              name="inflation_rate"
              value={formData.inflation_rate}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="1.4"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">GDP</span>
            <input
              type="number"
              name="gdp"
              value={formData.gdp}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="1.74"
              required
            />
          </label>
        </div>

        {error && <p className="rounded-2xl bg-red-500/20 px-4 py-3 text-sm text-red-200">{error}</p>}

        {loading && (
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
            <span>Loading...</span>
          </div>
        )}

        {!loading && prediction && (
          prediction === 'Graduate' ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-300">
              Green Success: Graduate
            </div>
          ) : prediction === 'Enrolled' ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/15 px-4 py-3 text-sm font-medium text-amber-300">
              Amber Info: Enrolled
            </div>
          ) : (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/15 px-4 py-3 text-sm font-medium text-rose-300">
              Red Warning: Dropout
            </div>
          )
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-indigo-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {loading ? 'Predicting...' : 'Predict Outcome'}
        </button>
      </form>
    </section>
  )
}

export default PredictionPage
