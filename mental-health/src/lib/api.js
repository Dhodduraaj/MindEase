import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const authApi = {
  async register(payload) {
    const { data } = await api.post('/auth/register', payload)
    return data
  },
  async login(payload) {
    const { data } = await api.post('/auth/login', payload)
    return data
  },
}

export const moodApi = {
  async list() {
    const { data } = await api.get('/moods')
    return data
  },
  async create(payload) {
    const { data } = await api.post('/moods', payload)
    return data
  },
  async update(id, payload) {
    const { data } = await api.put(`/moods/${id}`, payload)
    return data
  },
  async remove(id) {
    const { data } = await api.delete(`/moods/${id}`)
    return data
  },
}

export const chatApi = {
  async send(message) {
    const { data } = await api.post('/chat', { message })
    return data
  },
}

export const emotionApi = {
  async analyze(base64Jpeg) {
    const { data } = await api.post('/emotion', { image: base64Jpeg })
    return data
  },
}

export const questionnaireApi = {
  async analyze(answers, summary) {
    const { data } = await api.post('/questionnaire', { answers, summary })
    return data
  }
}

export default api


