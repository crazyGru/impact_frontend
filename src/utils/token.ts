export const setupToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
  }
}
