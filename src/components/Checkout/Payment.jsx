import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import { ScrollResetEffect, wordCap } from '@/components/Util/Util'

import s from './Payment.module.scss'

import edit from 'svg/pen-to-square.svg'
import mopVisa from '@/assets/mop/visa-mastercard.png'
import mopGcash from '@/assets/mop/paymongo_gcash.png'  
import mopGrab from '@/assets/mop/paymongo_grab_pay.png'
import mopMaya from '@/assets/mop/Maya_logo.png'
import mopBpi from '@/assets/mop/bpi.png'
import mopBillease from '@/assets/mop/billease.svg'

function Payment() {
  const { state, dispatch } = useGlobal()

  ScrollResetEffect()

  if(!state?.checkoutInformation) return <></>
  
  const { firstName, lastName, email, barangay, street, city, postcode, country, region, shipping, drop_location, mop } = state.checkoutInformation
  
  const name = `${firstName} ${lastName}`
  const address = [barangay, street, city, region, postcode, country].filter(s => (s != null && s !== '')).join(', ')
  const shippingMethod = `${shipping}${shipping === 'Personal Pickup' ? ` | ${drop_location}` : ''}`

  const handleInputChange = (t) => {
    const { name, value } = t
    dispatch({type: ACTIONS.UPDATE_CHECKOUT_INFORMATION, payload: { name, value }})
  }

  return (
    <section className={s.payment}>
      <ul className={s.infoList}>
        <li>
          <span className={s.title}>Name</span>
          <span>{name}</span>
          <Link to='/checkout/information' state={{ fromValidSource: true }}>
            <img src={edit} loading='lazy' alt="edit" />
          </Link>
        </li>
        <li>
          <span className={s.title}>Email</span>
          <span>{email}</span>
          <Link to='/checkout/information' state={{ fromValidSource: true }}>
            <img src={edit} loading='lazy' alt="edit" />
          </Link>
        </li>
        <li>
          <span className={s.title}>Address</span>
          <span>{address}</span>
          <Link to='/checkout/information' state={{ fromValidSource: true }}>
            <img src={edit} loading='lazy' alt="edit" />
          </Link>
        </li>
        <li>
          <span className={s.title}>Shipping Method</span>
          <span>{shippingMethod}</span>
          <Link to='/checkout/information' state={{ fromValidSource: true }}>
            <img src={edit} loading='lazy' alt="edit" />
          </Link>
        </li>
      </ul>
      <Formik
        initialValues={{mop}}
        enableReinitialize={true}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className='flex-col gap-20'>
            <div>
              <h4>Payment Information</h4>
              <p>All transactions are secure and encrypted. Credit card information is never stored on our servers.</p>
            </div>
            <ul className={s.mopList}>
              <li className={cn({[s.show]: values.mop === 'Credit Card'})}>
                <label htmlFor='Credit Card' className={s.header}>
                  <Field type='radio' name='mop' value='Credit Card' id='Credit Card' onChange={(e) => handleInputChange(e.target)} required/>
                  <span>Credit Card</span>
                  <img src={mopVisa} loading='lazy' alt="Credit Card" />
                </label>
                <div className={s.content}>
                  <span>Visa & Mastercard - Card Number, Expiry Date, Card Code (CVC)</span>
                </div>
              </li>
              <li className={cn({[s.show]: values.mop === 'Gcash'})}>
                <label htmlFor='Gcash' className={s.header}>
                  <Field type='radio' name='mop' value='Gcash' id='Gcash' onChange={(e) => handleInputChange(e.target)} required/>
                  <span>Gcash</span>
                  <img src={mopGcash} loading='lazy' alt="Gcash" />
                </label>
                <div className={s.content}>
                  <span>Simple and easy payments</span>
                </div>
              </li>
              <li className={cn({[s.show]: values.mop === 'Grab Pay'})}>
                <label htmlFor='Grab Pay' className={s.header}>
                  <Field type='radio' name='mop' value='Grab Pay' id='Grab Pay' onChange={(e) => handleInputChange(e.target)} required/>
                  <span>Grab Pay</span>
                  <img src={mopGrab} loading='lazy' alt="Grab Pay" />
                </label>
                <div className={s.content}>
                  <span>Simple and easy payments</span>
                </div>
              </li>
              <li className={cn({[s.show]: values.mop === 'Maya'})}>
                <label htmlFor='Maya' className={s.header}>
                  <Field type='radio' name='mop' value='Maya' id='Maya' onChange={(e) => handleInputChange(e.target)} required/>
                  <span>Maya</span>
                  <img src={mopMaya} loading='lazy' alt="Maya" />
                </label>
                <div className={s.content}>
                  <span>Simple and easy payments</span>
                </div>
              </li>
              <li className={cn({[s.show]: values.mop === 'BPI'})}>
                <label htmlFor='BPI' className={s.header}>
                  <Field type='radio' name='mop' value='BPI' id='BPI' onChange={(e) => handleInputChange(e.target)} required/>
                  <span>BPI DOB</span>
                  <img src={mopBpi} loading='lazy' alt="BPI DOB" />
                </label>
                <div className={s.content}>
                  <span>Simple and easy payments</span>
                </div>
              </li>
              <li className={cn({[s.show]: values.mop === 'Billease'})}>
                <label htmlFor='Billease' className={s.header}>
                  <Field type='radio' name='mop' value='Billease' id='Billease' onChange={(e) => handleInputChange(e.target)} required/>
                  <span>Billease</span>
                  <img src={mopBillease} loading='lazy' alt="Billease" />
                </label>
                <div className={s.content}>
                  <span>Simple and easy payments</span>
                </div>
              </li>
            </ul>
            <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link>privacy policy.</Link></p>
            <button type='button' className={s.submitBtn}>Proceed to Next Step</button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default Payment