const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running', status: 'ok' })
})

function computePrediction(data) {
  const age = Number(data.age || 0)
  const studytime = Number(data.studytime || 0)
  const failures = Number(data.failures || 0)
  const absences = Number(data.absences || 0)
  const G1 = Number(data.G1 || 0)
  const G2 = Number(data.G2 || 0)

  const gradeAverage = (G1 + G2) / 2
  const riskScore = failures * 2 + absences * 0.3 + (studytime <= 1 ? 5 : 0)
  const predictedGrade = Math.round(Math.min(20, Math.max(0, gradeAverage - riskScore + 2)))
  const label = predictedGrade >= 12 ? 'Likely passing' : predictedGrade >= 8 ? 'Needs attention' : 'At risk'

  return {
    prediction: predictedGrade,
    label,
  }
}

app.post('/api/predict', (req, res) => {
  const studentData = req.body

  if (!studentData || typeof studentData !== 'object') {
    return res.status(400).json({ error: 'Invalid student data payload' })
  }

  try {
    const prediction = computePrediction(studentData)
    res.json(prediction)
  } catch (error) {
    console.error('Prediction error:', error)
    res.status(500).json({ error: 'Prediction processing failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})