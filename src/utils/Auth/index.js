const isLoggedIn = () => {
  return {token: localStorage.getItem('token'), refreshToken: localStorage.getItem('refreshToken')}
}

const setUser = user => {
  const { accessToken, refreshToken } = user
  localStorage.setItem('token', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

const getToken = () => {
  return localStorage.getItem('token')
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
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
