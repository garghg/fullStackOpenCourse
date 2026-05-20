import { Alert } from '@mui/material'

const Notification = ({ alert }) => {
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