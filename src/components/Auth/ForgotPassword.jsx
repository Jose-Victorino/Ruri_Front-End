import { useState } from 'react'
import { Formik, Field, Form } from 'formik'

import s from './ForgotPassword.module.scss'

function ForgotPassword() {

  return (
    <>
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