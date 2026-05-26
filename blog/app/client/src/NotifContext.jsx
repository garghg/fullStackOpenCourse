import { createContext, useState } from 'react'

const NotifContext = createContext()

export default NotifContext

export const NotifContextProvider = (props) => {
  const [alert, setAlert] = useState(null)
  return (
    <NotifContext.Provider value={{ alert, setAlert }}>
      {props.children}
    </NotifContext.Provider>
  )
}
