import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik'

import s from './Login.module.scss'

import arrowLeft from '../../assets/svg/arrow-left.svg'
import eyeIcon from '../../assets/svg/eye.svg'
import eyeSlashIcon from '../../assets/svg/eye-slash.svg'

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);  

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
      >
        {({ values, setFieldValue, errors, touched }) => {
          return (
            <Form className={s.form}>
              <button type="button" className={s.goBackbtn} onClick={() => navigate(-1)}>
                <div>
                  <img src={arrowLeft} alt="arrow" />
                </div>
                <span>Go Back</span>
              </button>
              <h1 className='mb-15'>Login</h1>
              <div className={s.top}>
                <div>
                  <Field className={s.txtField} type='email' name='email' placeholder='Email' required/>
                </div>
                <div style={{position: 'relative'}}>
                  <Field className={s.txtField} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' required/>
                  <button type='button' className={s.showPass} onClick={() => setShowPassword((prev) => !prev)}>
                    <img src={showPassword ? eyeIcon : eyeSlashIcon} alt="eye" />
                  </button>
                </div>
              </div>
              <div className={s.bottom}>
                <label htmlFor='rememberMe' role='button' className={s.rememberMe}>
                  <Field type='checkbox' name='rememberMe' id='rememberMe'/>
                  <span>Remember me</span>
                </label>
                <div>
                  <NavLink>Forgot your password?</NavLink>
                </div>
              </div>
              <button className={s.submitBtn} type='submit'>Login</button>
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