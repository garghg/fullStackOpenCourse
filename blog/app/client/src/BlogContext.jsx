import { createContext, useState } from 'react'

const BlogContext = createContext()

export default BlogContext

export const BlogContextProvider = (props) => {
  const [alert, setAlert] = useState(null)
  const [user, setUser] = useState(null)
  return (
    <BlogContext.Provider value={{ alert, setAlert, user, setUser }}>
      {props.children}
    </BlogContext.Provider>
  )
}
