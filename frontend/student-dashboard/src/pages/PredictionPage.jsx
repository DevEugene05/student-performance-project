import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { predictStudent } from '../services/api.js'

const initialState = {
  age: '',
  studytime: '',
  failures: '',
  absences: '',
  G1: '',
  G2: '',
}

function PredictionPage() {
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload = {
        age: Number(formData.age),
        studytime: Number(formData.studytime),
        failures: Number(formData.failures),
        absences: Number(formData.absences),
        G1: Number(formData.G1),
        G2: Number(formData.G2),
      }

      const result = await predictStudent(payload)
      const savedPrediction = {
        ...payload,
        prediction: result.prediction,
        label: result.label || 'Prediction generated',
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem('latestPrediction', JSON.stringify(savedPrediction))
      navigate('/results', { state: savedPrediction })
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
          Enter student data to generate a performance prediction.
        </h1>
        <p className="mt-6 text-slate-300 leading-8">
          The backend will receive student details, process the request, and return a prediction in a clean, reusable flow.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Age</span>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="15"
              min="10"
              max="25"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Study Time (hours/week)</span>
            <input
              type="number"
              name="studytime"
              value={formData.studytime}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="3"
              min="1"
              max="20"
              required
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Past Failures</span>
            <input
              type="number"
              name="failures"
              value={formData.failures}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="0"
              min="0"
              max="10"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Absences</span>
            <input
              type="number"
              name="absences"
              value={formData.absences}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="2"
              min="0"
              max="30"
              required
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">First Period Grade (G1)</span>
            <input
              type="number"
              name="G1"
              value={formData.G1}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="12"
              min="0"
              max="20"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">Second Period Grade (G2)</span>
            <input
              type="number"
              name="G2"
              value={formData.G2}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-indigo-400"
              placeholder="14"
              min="0"
              max="20"
              required
            />
          </label>
        </div>

        {error && <p className="rounded-2xl bg-red-500/20 px-4 py-3 text-sm text-red-200">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-indigo-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {loading ? 'Sending request...' : 'Submit to Predict'}
        </button>
      </form>
    </section>
  )
}

export default PredictionPage
