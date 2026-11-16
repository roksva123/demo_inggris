const request = async (path, options) => {
  const response = await fetch(path, options)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export const loadContent = async () => {
  const [programs, testimonials, tutors, stats] = await Promise.all([
    request('/api/programs'),
    request('/api/testimonials'),
    request('/api/tutors'),
    request('/api/stats'),
  ])
  return { programs, testimonials, tutors, stats }
}

export const submitTrial = (payload) => request('/api/trial', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
})
