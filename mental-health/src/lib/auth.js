export function getToken() {
  return localStorage.getItem('token') || ''
}

export function setToken(token) {
  if (token) localStorage.setItem('token', token)
  else localStorage.removeItem('token')
  window.dispatchEvent(new Event('auth-changed'))
}

export function isLoggedIn() {
  return !!getToken()
}


