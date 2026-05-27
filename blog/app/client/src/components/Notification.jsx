import { Alert } from '@mui/material'
import BlogContext from '../BlogContext'
import { useContext } from 'react'

const Notification = () => {
  const { alert } = useContext(BlogContext)

  if (alert === null) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={alert.type}>
      {alert.message}
    </Alert>
  )
}

export default Notification