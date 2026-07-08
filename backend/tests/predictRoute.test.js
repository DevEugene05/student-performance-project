const test = require('node:test')
const assert = require('node:assert/strict')

const { normalizeFlaskPredictionUrl } = require('../predictService')

test('normalizes the Flask prediction endpoint to /api/predict', () => {
  assert.equal(normalizeFlaskPredictionUrl('http://127.0.0.1:5001/predict'), 'http://127.0.0.1:5001/api/predict')
  assert.equal(normalizeFlaskPredictionUrl('http://127.0.0.1:5001/api/predict'), 'http://127.0.0.1:5001/api/predict')
  assert.equal(normalizeFlaskPredictionUrl('http://127.0.0.1:5001/'), 'http://127.0.0.1:5001/api/predict')
})
