const API_BASE_URL = import.meta.env.VITE_API_URL || ''

export async function predictStudent(studentData) {
  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  })

  let payload = {}
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    try {
      payload = await response.json()
    } catch (error) {
      payload = { error: 'Prediction service returned an invalid JSON response' }
    }
  } else {
    const text = await response.text()
    payload = text ? { error: text } : { error: 'Prediction service returned an empty response' }
  }

  if (!response.ok) {
    throw new Error(payload.error || 'Prediction request failed')
  }

  return payload
}

export function formatGradeLabel(prediction) {
  if (prediction === null || prediction === undefined) return 'No prediction'
  if (prediction === 'Graduate') return 'High chance of graduating'
  if (prediction === 'Enrolled') return 'Currently enrolled with moderate risk'
  return 'At risk of dropping out'
}
