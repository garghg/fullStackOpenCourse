import blogService from './blogs'

export const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return user
  }
  return null
}

export const removeUser = () => {
  window.localStorage.removeItem('loggedUser')
}

export const saveUser = (user) => {
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
  blogService.setToken(user.token)
}
