import React from 'react'
import { useForm } from './form'
import './submit.sass'

export default function Submit(props) {
  let {
    text = 'Submit',
    icon
  } = props

  let { onSubmit } = useForm()

  return (
    <div className="form-submit">
      <button className="form-submit-button" onClick={e => e.preventDefault() & onSubmit()}>
        {icon && <i className={`fa fa-${icon}`} />}
        {text}
      </button>
    </div>
  )
}