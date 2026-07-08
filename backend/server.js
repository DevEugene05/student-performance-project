const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { normalizeFlaskPredictionUrl } = require('./predictService')

const app = express()
const PORT = process.env.PORT || 5000
const FLASK_URL = normalizeFlaskPredictionUrl(process.env.FLASK_URL || 'http://127.0.0.1:5001/predict')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running', status: 'ok' })
})

app.post('/api/predict', async (req, res) => {
  const studentData = req.body

  if (!studentData || typeof studentData !== 'object') {
    return res.status(400).json({ error: 'Invalid student data payload' })
  }

  try {
    const response = await axios.post(FLASK_URL, {
      level: studentData.level || 'Freshman',
      attendance_rate: studentData.attendance_rate ?? studentData.attendanceRate ?? studentData.attendance,
      assignment_score: studentData.assignment_score ?? studentData.assignmentScore,
      midterm_score: studentData.midterm_score ?? studentData.midtermScore,
    })

    return res.json({
      prediction: response.data.prediction,
      label: response.data.prediction,
      interventions: response.data.interventions || [],
    })
  } catch (error) {
    console.error('Prediction forwarding error:', error.message)
    return res.status(502).json({
      error: 'Failed to reach prediction service',
      details: error.response?.data || error.message,
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})