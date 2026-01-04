import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input.formik'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'

import s from './ForgotPassword.module.scss'

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
})

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be 8 characters minimum')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
})

function ForgotPassword() {
  const { state, dispatch } = useGlobal()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  const verifyEmailExists = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const emailExists = state.USERS?.some(u => u.email === email)
        resolve(emailExists)
      }, 50) 
    })
  }

  const handleEmailSubmit = async (values) => {
    setIsVerifying(true)
    setError('')
    
    try {
      const emailExists = await verifyEmailExists(values.email)
      if (emailExists) {
        setEmail(values.email)
        setStep(2)
      } else {
        setError('Invalid Email')
      }
    } catch (e) {
      setError('Error verifying email. Please try again.')
    }
    finally {
      setIsVerifying(false)
    }
  }

  const handlePasswordSubmit = (values) => {
    const user = state.USERS.find(u => u.email === email)

    dispatch({
      type: ACTIONS.UPDATE_USER_PASSWORD,
      payload: {
        email: email,
        password: values.password
      }
    })
    dispatch({ type: ACTIONS.SET_AUTH_USER, payload: user })
    navigate({pathname: '/', replace: true})
    setEmail('')
  }

  const handleBackToEmail = () => {
    setStep(1)
  }

  const ConfirmEmail = () => (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={emailValidationSchema}
      onSubmit={handleEmailSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={s.form}>
          <h1 className='mb-15'>Recover Password</h1>
          <Input displayName='Enter your Email' input={{type: 'email', name: 'email', id: 'email', required: true}} error={errors.email} touched={touched.email}/>
          {error && <span className={s.errorMsg}>{error}</span>}
          <Button
            type='submit'
            text={isVerifying ? 'Verifying...' : 'Confirm'}
            color='green'
            disabled={isVerifying || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  )

  const PasswordChange = () => (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={passwordValidationSchema}
      onSubmit={handlePasswordSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={s.form}>
          <h1 className='mb-15'>Set New Password</h1>
          <p className={s.emailDisplay}>Email: <strong>{email}</strong></p>
          <div className='flex-col gap-10'>
            <Input displayName='New Password' input={{type: 'password', name: 'password', id: 'password', required: true}} error={errors.password} touched={touched.password}/>
            <Input displayName='Re-enter password' input={{type: 'password', name: 'confirmPassword', id: 'confirmPassword', required: true}} error={errors.confirmPassword} touched={touched.confirmPassword}/>
          </div>
          <div className='flex gap-10'>
            <Button
              btnType='secondary'
              type='button'
              text='Back'
              color='green'
              onClick={handleBackToEmail}
            />
            <Button
              type='submit'
              text='Reset Password'
              color='green'
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  )

  return step === 1 ? <ConfirmEmail /> : <PasswordChange />
}

export default ForgotPassword