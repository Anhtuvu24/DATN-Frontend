const isLoggedIn = () => {
  return localStorage.getItem('token')
}

const setUser = user => {
  const { auth_token: token } = user
  localStorage.setItem('token', token)
}

const getToken = () => {
  return localStorage.getItem('token')
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
}

const login = user => {
  setUser(user)
}

const getLastLogin = user_id => {
  const key = 'last_login_' + user_id
  return localStorage.getItem(key)
}

const setLastLogin = user_id => {
  const key = 'last_login_' + user_id
  localStorage.setItem(key, Date.now())
}

export default {
  login,
  logout,
  isLoggedIn,
  getToken,
  getLastLogin,
  setLastLogin,
}
