import { useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'

import s from './SignUp.module.scss'

import eyeIcon from 'svg/eye.svg'
import eyeSlashIcon from 'svg/eye-slash.svg'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters minimum')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[^a-zA-Z0-9]/, 'Password requires a symbol')
  phoneNumber: Yup.string().required('Phone number is required').matches(/^[0-9]{11,}$/, 'Phone number must be at least 11 digits'),
  birthday: Yup.string().required(),
})

function SignUp() {
  const navigate = useNavigate()
  const { state, dispatch } = useGlobal()
  const [searchParams] = useSearchParams()
  const [showPassword, setShowPassword] = useState(false) 

  const { MEMBERSHIPS } = state
  const membershipParam = searchParams.get('membership')

  const onSubmit = (values) => {
    const userId = Math.floor(Date.now() + Math.random())
    const newUser = { ...values, userId, address: {} }
    
    dispatch({ type: ACTIONS.ADD_USER, payload: newUser})
    dispatch({ type: ACTIONS.SET_AUTH_USER, payload: newUser})
    navigate('/')
  }
  
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          membership: MEMBERSHIPS.includes(membershipParam) ? membershipParam : 'seed',
          phoneNumber: '',
          birthday: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => {
          return (
            <Form className={s.form}>
              <h1 className='mb-15'>Sign up</h1>
              <div className='flex-col gap-15'>
                <div className='flex gap-15'>
                  <Field className={s.txtField} type='text' name='firstName' placeholder='First Name' required/>
                  <Field className={s.txtField} type='text' name='lastName' placeholder='Last Name' required/>
                </div>
                <Field className={s.txtField} type='text' name='email' placeholder='Email' required/>
                <Field className={s.txtField} type='text' name='phoneNumber' pattern="[0-9]*" inputMode="numeric" placeholder='Phone Number (09xxxxxxxxx)' required/>
                <div style={{position: 'relative'}}>
                  <Field className={s.txtField} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' required/>
                  <button type='button' className={s.showPass} onClick={() => setShowPassword((prev) => !prev)}>
                    <img src={showPassword ? eyeIcon : eyeSlashIcon} loading="lazy" alt="eye" />
                  </button>
                </div>
                <div>
                  <span>Membership</span>
                  <Field className={s.txtField} as='select' name='membership'>
                    {MEMBERSHIPS.map((m) =>
                      <option value={m.membershipId} key={m.name}>{m.name}</option>
                    )}
                  </Field>
                </div>
                <div>
                  <span>Date of Birth</span>
                  <Field className={s.txtField} type='date' name='birthday' placeholder='' required/>
                </div>
              </div>
              <button className={s.submitBtn} type='submit'>Register</button>
            </Form>
          )
        }}
      </Formik>
      <div className={s.alt}>
        <p>Already have an account? <NavLink to='/auth/login' replace={true}>Login</NavLink></p>
      </div>
    </>
  )
}

export default SignUp