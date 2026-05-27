import { Alert } from '@mui/material'
import { useNotifAlert } from '../notificationStore'

const Notification = () => {
  const alert = useNotifAlert()

  if (!alert) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={alert.type}>
      {alert.message}
    </Alert>
  )
}

export default Notification