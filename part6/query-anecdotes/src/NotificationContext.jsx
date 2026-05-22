import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotifContextProvider = (props) => {
    const [alert, setAlert] = useState('')

    return (
        <NotificationContext.Provider value={{ alert, setAlert }}>
            {props.children}
        </NotificationContext.Provider>
    )
}