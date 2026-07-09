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
      admission_grade: studentData.admission_grade,
      previous_qualification_grade: studentData.previous_qualification_grade,
      age_at_enrollment: studentData.age_at_enrollment,
      curricular_units_1st_sem_grade: studentData.curricular_units_1st_sem_grade,
      curricular_units_2nd_sem_grade: studentData.curricular_units_2nd_sem_grade,
      unemployment_rate: studentData.unemployment_rate,
      inflation_rate: studentData.inflation_rate,
      gdp: studentData.gdp,
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