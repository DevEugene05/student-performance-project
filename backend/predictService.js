function normalizeFlaskPredictionUrl(url) {
  if (!url) {
    return 'http://127.0.0.1:5001/api/predict'
  }

  const trimmedUrl = url.trim()
  if (!trimmedUrl) {
    return 'http://127.0.0.1:5001/api/predict'
  }

  const withoutTrailingSlash = trimmedUrl.endsWith('/') ? trimmedUrl.slice(0, -1) : trimmedUrl
  if (withoutTrailingSlash.endsWith('/api/predict')) {
    return withoutTrailingSlash
  }

  if (withoutTrailingSlash.endsWith('/predict')) {
    return `${withoutTrailingSlash.replace(/\/predict$/, '')}/api/predict`
  }

  return `${withoutTrailingSlash}/api/predict`
}

module.exports = {
  normalizeFlaskPredictionUrl,
}
