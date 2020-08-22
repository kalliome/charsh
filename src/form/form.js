import React, { createContext, useState, useContext } from 'react'
import './form.sass'

export const FormContext = createContext({})

const validateForm = (validation, values) => Object.keys(validation)
  .reduce((errors, name) => {
    let value = values[name]
    let rules = validation[name] || []

    let results = rules.reduce((res, rule) => {
      if(rule === 'required' && !value)
        return [...res, 'Field is required']

      return res
    }, [])

    if(results.length)
      errors[name] = results

    return errors
  }, {})

export default function Form(props) {

  let {
    onSubmit: submitHandler, 
    validation: propValidation,
    children,
    style = 'ui'
  } = props

  let [values, setValues] = useState({username: 'gm', password: 'password'})
  let [errors, setErrors] = useState({})
  let [loading, setLoading] = useState(false)
  let [messages, setMessages] = useState([])

  const onSubmit = async e => {
    if(e && e.preventDefault)
      e.preventDefault()

    setLoading(true)

    let validation = typeof propValidation === 'function' ? propValidation.call(null, values) :
      typeof propValidation === 'object' ? {...propValidation} : {}

    let submitErrors = validateForm(validation, values)
    setErrors(submitErrors)

    if(!Object.keys(submitErrors).length) {
      try {
        let res = await submitHandler(values)
        
        setMessages(Array.isArray(res.messages) ? res.messages : res.message ? [res.message] : [])
      } catch (err) {
        console.log(err)
        setMessages(['Error occured'])
      }
    }

    setLoading(false)
  }

  const onChange = e => {
    let { name, value } = e.target || e
  
    setValues({
      ...values,
      [name]: value
    })
  }

  const contextValue = {
    values,
    errors,
    onChange,
    onSubmit,
    loading,
    messages
  }

  let classes = ['form', `form--${style}`]
  if(loading)
    classes.push('form--loading')

  return (
    <FormContext.Provider value={contextValue}>
      <form className={classes.join(' ')} onSubmit={onSubmit}>
        {!messages.length || (
          <div className="form-messages">
            {messages.map(message => <div className="form-message" key={message}>{message}</div>)}
          </div>
        )}
        {children}
        {loading && (
          <div className="form-loader">
            <div className="form-loader-icon" />
          </div>
        )}
      </form>
    </FormContext.Provider>
  )
}

export function useForm() {
  return useContext(FormContext)
}