import { useState } from 'react'
import { predictStudent } from '../services/api.js'

const initialState = {
  level: '',
  attendance_rate: '',
  assignment_score: '',
  midterm_score: '',
}

function PredictionPage() {
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
        level: formData.level,
        attendance_rate: Number(formData.attendance_rate),
        assignment_score: Number(formData.assignment_score),
        midterm_score: Number(formData.midterm_score),
      }

      const result = await predictStudent(payload)
      setPrediction(result.prediction)
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
          Enter student performance metrics to get an outcome prediction.
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          Submit the values to the backend and view whether the student is classified as Safe or At-Risk.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Level</span>
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="Freshman"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Attendance Rate</span>
            <input
              type="number"
              name="attendance_rate"
              value={formData.attendance_rate}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="92"
              min="0"
              max="100"
              required
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Assignment Score</span>
            <input
              type="number"
              name="assignment_score"
              value={formData.assignment_score}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="88"
              min="0"
              max="100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Midterm Score</span>
            <input
              type="number"
              name="midterm_score"
              value={formData.midterm_score}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="84"
              min="0"
              max="100"
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
          prediction === 'Safe' ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-300">
              Green Success: Safe
            </div>
          ) : (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/15 px-4 py-3 text-sm font-medium text-rose-300">
              Red Warning: At-Risk
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
