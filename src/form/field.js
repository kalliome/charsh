import React from 'react'
import { useForm } from './form'
import './field.sass'

import Input from './input'

const inputs = {
  text: Input,
  password: Input,
  email: Input,
  number: Input,
}

export default function Field(props) {

  let {
    name,
    label,
    type,
    ...rest
  } = props

  let { values, errors, onChange } = useForm()

  let value = values[name]

  const inputProps = {
    ...rest,
    name,
    type,
    value,
    values,
    errors,
    onChange
  }

  let classes = ['form-field']

  const error = errors[name] || []

  if(error.length)
    classes.push('form-field--error')

  const Input = inputs[type] || false

  return (
    <div className={classes.join(' ')}>
      <label htmlFor={name} className="form-field-label">
        {label}
      </label>
      <div className={`form-field-input form-field-input--${type}`}>
        {Input ? (
          <Input {...inputProps} />
        ) : `Input not found ${type}`}
      </div>
      {error.length ? (
        <div className="form-field-errors">
          {error.map(err => (
            <div className="form-field-error" key={err}>{err}</div>
          ))}
        </div>
      ) : null}
    </div>
  )
}