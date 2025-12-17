import React from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik'

import s from './ForgotPassword.module.scss'

import arrowLeft from 'svg/arrow-left.svg'

function ForgotPassword() {
  const navigate = useNavigate()

  return (
    <>
      <button type="button" className={s.goBackbtn} onClick={() => navigate(-1)}>
        <div>
          <img src={arrowLeft} loading="lazy" alt="arrow" />
        </div>
        <span>Go Back</span>
      </button>
      <Formik initialValues={{ email: '' }}>
        <Form className={s.form}>
          <h1 className='mb-15'>Recover Password</h1>
          <div className='flex-col gap-10'>
            <p>Enter your Email</p>
            <Field className={s.txtField} type='email' name='email' placeholder='Email' required/>
          </div>
          <button className={s.submitBtn} type='submit'>Send</button>
        </Form>
      </Formik>
    </>
  )
}

export default ForgotPassword