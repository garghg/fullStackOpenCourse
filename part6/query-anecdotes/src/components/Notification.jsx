import useNotify from '../hooks/useNotify'
import { useEffect } from 'react'

const Notification = () => {
  const { alert, setAlert } = useNotify()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [alert, setAlert])

  if (!alert) return null

  return (
    <div style={style}>
      {alert}
    </div>
  )
}

export default Notification
