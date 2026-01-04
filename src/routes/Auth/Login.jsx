import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useGlobal, ACTIONS } from '@/context/GlobalContext'

import Button from '@/components/Button/Button'

import s from './Login.module.scss'

import eyeIcon from 'svg/eye.svg'
import eyeSlashIcon from 'svg/eye-slash.svg'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters minimum')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[^a-zA-Z0-9]/, 'Password requires a symbol')
})

function Login() {
  const navigate = useNavigate()
  const { state, dispatch } = useGlobal()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (values) => {
    const { email, password, rememberMe } = values
    
    const user = state.USERS.find(u => u.email === email && u.password === password)
    
    if(user) {
      dispatch({ type: ACTIONS.SET_AUTH_USER, payload: user })
      navigate('/')
    } else {
      toast.error('Invalid email or password')
    }
  }
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => {
          return (
            <Form className={s.form}>
              <h1 className='mb-15'>Login</h1>
              <div className={s.top}>
                <div>
                  <Field className={s.txtField} type='email' name='email' placeholder='Email' required/>
                </div>
                <div style={{position: 'relative'}}>
                  <Field className={s.txtField} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' required/>
                  <button type='button' className={s.showPass} onClick={() => setShowPassword((prev) => !prev)}>
                    <img src={showPassword ? eyeIcon : eyeSlashIcon} loading="lazy" alt="eye" />
                  </button>
                </div>
                {errors.password && <span className={s.errorMsg}>{errors.password}</span>}
              </div>
              <div className={s.bottom}>
                <label htmlFor='rememberMe' role='button' className={s.rememberMe}>
                  <Field type='checkbox' name='rememberMe' id='rememberMe'/>
                  <span>Remember me</span>
                </label>
                <div>
                  <NavLink to='/auth/login/forgot-password'>Forgot your password?</NavLink>
                </div>
              </div>
              <Button
                type='submit'
                text='Login'
                color='green'
              />
            </Form>
          ) 
        }}
      </Formik>
      <div className={s.alt}>
        <p>Don't have an account? <NavLink to='/auth/sign-up' replace={true}>Sign up</NavLink></p>
      </div>
    </>
  )
}

export default Login