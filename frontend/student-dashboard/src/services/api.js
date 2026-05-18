const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function predictStudent(studentData) {
  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  })

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload.error || 'Prediction request failed')
  }

  return payload
}

export function formatGradeLabel(prediction) {
  if (prediction === null || prediction === undefined) return 'No prediction'
  if (prediction >= 12) return 'High chance of success'
  if (prediction >= 8) return 'Moderate outcome'
  return 'At risk / needs support'
}
