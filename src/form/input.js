import React from 'react'

export default function Input(props) {
  let {
    name,
    value,
    onChange,
    type,
    placeholder = ''
  } = props

  return (
    <input name={name} 
      value={value || ''}
      onChange={onChange}
      type={type}
      placeholder={placeholder} />
  )
}