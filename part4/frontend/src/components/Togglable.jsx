import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const buttonStyle = { display: visible ? 'none' : '' }
  const contentStyle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={buttonStyle}>
        <button onClick={toggleVisibility}>{props.showLabel}</button>
      </div>
      <div style={contentStyle}>
        {props.children}
        <button onClick={toggleVisibility}>{props.hideLabel || 'cancel'}</button>
      </div>
    </div>
  )
}

export default Togglable