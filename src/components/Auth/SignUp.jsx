import { useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik'

import s from './SignUp.module.scss'

import arrowLeft from '@/assets/svg/arrow-left.svg'
import eyeIcon from '@/assets/svg/eye.svg'
import eyeSlashIcon from '@/assets/svg/eye-slash.svg'

const MEMBERSHIPS = ['seed', 'tree', 'forest'];

function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);  

  const membershipParam = searchParams.get('membership');

  const onSubmit = ({firstName, lastName, email, password, membership, phoneNumber, birthDay}) => {
    
  }
  
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          membership: MEMBERSHIPS.includes(membershipParam) ? membershipParam : '',
          phoneNumber: '',
          birthDay: '',
        }}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => {
          return (
            <Form className={s.form}>
              <button type="button" className={s.goBackbtn} onClick={() => navigate(-1)}>
                <div>
                  <img src={arrowLeft} loading="lazy" alt="arrow" />
                </div>
                <span>Go Back</span>
              </button>
              <h1 className='mb-15'>Sign up</h1>
              <div className='flex-col gap-15'>
                <div className='flex gap-15'>
                  <Field className={s.txtField} type='text' name='firstName' placeholder='First Name' required/>
                  <Field className={s.txtField} type='text' name='lastName' placeholder='Last Name' required/>
                </div>
                <Field className={s.txtField} type='text' name='email' placeholder='Email' autoComplete="off" required/>
                <Field className={s.txtField} type='number' name='phoneNumber' placeholder='Phone Number' required/>
                <div style={{position: 'relative'}}>
                  <Field className={s.txtField} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' required/>
                  <button type='button' className={s.showPass} onClick={() => setShowPassword((prev) => !prev)}>
                    <img src={showPassword ? eyeIcon : eyeSlashIcon} loading="lazy" alt="eye" />
                  </button>
                </div>
                <div>
                  <span>Membership</span>
                  <Field className={s.txtField} as='select' name='membership'>
                    {MEMBERSHIPS.map((t) => {
                      return <option value={t} key={t}>{t}</option>
                    })}
                  </Field>
                </div>
                <div>
                  <span>Date of Birth</span>
                  <Field className={s.txtField} type='date' name='birthDay' placeholder='' required/>
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