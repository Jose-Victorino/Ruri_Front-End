import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import { ScrollResetEffect } from '@/library/Util'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input.formik'

import s from './Information.module.scss'

const validationSchema = Yup.object().shape({
  shipping: Yup.string().required('Shipping method is required'),
  drop_location: Yup.string().when('shipping', {
    is: 'Personal Pickup',
    then: (schema) => schema.required('Please select a pickup location'),
    otherwise: (schema) => schema.notRequired()
  }),
  firstName: Yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required').matches(/^[0-9]{11,}$/, 'Phone number must be at least 11 digits'),
  street: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  postcode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required'),
  region: Yup.string().required('Region is required'),
  termsAndConditions: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
})

function Information() {
  const { state, dispatch } = useGlobal()
  const navigate = useNavigate()

  const { user } = state.auth
  const defaultAddress = user?.address?.find(addr => addr.isDefault) || null

  const defaultState = {
    shipping: '',
    drop_location: '',
    note: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    barangay: defaultAddress?.barangay || '',
    street: defaultAddress?.street || '',
    city: defaultAddress?.city || '',
    postcode: defaultAddress?.postcode || '',
    country: defaultAddress?.country || 'Philippines',
    region: defaultAddress?.region || 'Metro Manila',
    termsAndConditions: false,
    mop: '',
  }
  const informationState = { ...defaultState, ...state.checkoutInformation }
  
  ScrollResetEffect()

  const handleInputChange = (t) => {
    const { name, checked, value } = t
    if(name === 'termsAndConditions'){
      dispatch({type: ACTIONS.UPDATE_CHECKOUT_INFORMATION, payload: { name, value: checked}})
    }
    else
      dispatch({type: ACTIONS.UPDATE_CHECKOUT_INFORMATION, payload: { name, value }})
  }
  
  const handleSubmit = (v) => {
    navigate('/checkout/payment', { state: { fromValidSource: true } })
  }

  return (
    <Formik initialValues={informationState} validationSchema={validationSchema} enableReinitialize={true} onSubmit={handleSubmit}>
      {({ values, setFieldValue, errors, touched, isValid }) => (
        <Form className={cn(s.form, 'flex-col gap-20')}>
          <section className={s.shipping}>
            <h4>Shipping Method</h4>
            <div className='flex-col gap-15'>
              <ul className={s.shipList}>
                <li>
                  <div className='w-100'>
                    <div className='flex a-center gap-15 pad-5'>
                      <label htmlFor='pickup' className='flex gap-5 w-100'>
                        <Field type="radio" name='shipping' value='Personal Pickup' id='pickup' onClick={(e) => handleInputChange(e.target)} required/>
                        <p>Personal Pickup <span className={s.inputRequired}>*</span></p>
                      </label>
                      <p>Free</p>
                    </div>
                    {values.shipping === 'Personal Pickup' &&
                      <ul className={s.locationList}>
                        <li>
                          <label htmlFor='west' className='flex gap-5'>
                            <Field type="radio" name='drop_location' value='RURI WEST - West Triangle, Quezon City' id='west' onClick={(e) => handleInputChange(e.target)} required/>
                            <p>RURI WEST - West Triangle, Quezon City <span className={s.inputRequired}>*</span></p>
                          </label>
                        </li>
                        <li>
                          <label htmlFor='central' className='flex gap-5'>
                            <Field type="radio" name='drop_location' value='RURI CENTRAL - Mandaluyong' id='central' onClick={(e) => handleInputChange(e.target)} required/>
                            <p>RURI CENTRAL - Mandaluyong <span className={s.inputRequired}>*</span></p>
                          </label>
                        </li>
                        <li>
                          <label htmlFor='south' className='flex gap-5'>
                            <Field type="radio" name='drop_location' value='RURI SOUTH - Muntinlupa' id='south' onClick={(e) => handleInputChange(e.target)} required/>
                            <p>RURI SOUTH - Muntinlupa <span className={s.inputRequired}>*</span></p>
                          </label>
                        </li>
                      </ul>
                    }
                  </div>
                </li>
                <li>
                  <div className='flex a-center gap-15 pad-5 w-100'>
                    <label htmlFor='donate' className='flex gap-5 w-100'>
                      <Field type="radio" name='shipping' value='Donate' id='donate' onClick={(e) => {setFieldValue('drop_location', ''); handleInputChange(e.target); handleInputChange({name: 'drop_location', value: ''})}} required/>
                      <p>I am donating my Purchase <span className={s.inputRequired}>*</span></p>
                    </label>
                    <p>Free</p>
                  </div>
                </li>
                <li>
                  <div className='flex a-center gap-15 pad-5 w-100'>
                    <label htmlFor='weight_based' className='flex gap-5 w-100'>
                      <Field type="radio" name='shipping' value='Weight Based Shipping' id='weight_based' onClick={(e) => {setFieldValue('drop_location', ''); handleInputChange(e.target); handleInputChange({name: 'drop_location', value: ''})}} required/>
                      <p>Weight Based Shipping <span className={s.inputRequired}>*</span></p>
                    </label>
                    <p>₱250</p>
                  </div>
                </li>
              </ul>
              <div>
                <Field as='textarea' name="note" placeholder='Note' autoComplete='off' autoCapitalize='off' onChange={(e) => handleInputChange(e.target)}>
                </Field>
              </div>
            </div>
          </section>
          <section className={s.information}>
            <h4>Information</h4>
            <div className='flex-col gap-15'>
              <div className={s.inputGroup}>
                <Input displayName='First Name' input={{type: 'text', name: 'firstName', id: 'firstName', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.firstName} touched={touched.firstName}/>
                <Input displayName='Last Name' input={{type: 'text', name: 'lastName', id: 'lastName', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.lastName} touched={touched.lastName}/>
              </div>
              <Input input={{type:'text', name: 'email', id: 'email', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.email} touched={touched.email}/>
              <Input displayName='Phone Number' input={{type:'text', name: 'phoneNumber', id: 'phoneNumber', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.phoneNumber} touched={touched.phoneNumber}/>
              <Input input={{type: 'text', name: 'barangay', id: 'barangay', onChange: (e) => handleInputChange(e.target)}} error={errors.barangay} touched={touched.barangay}/>
              <Input input={{type:'text', name: 'street', id: 'street', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.street} touched={touched.street}/>
              <div className={s.inputGroup}>
                <Input input={{type:'text', name: 'city', id: 'city', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.city} touched={touched.city}/>
                <Input input={{type:'number', name: 'postcode', id: 'postcode', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.postcode} touched={touched.postcode}/>
              </div>
              <div className={s.inputGroup}>
                <Input input={{type: 'select', name: 'country', id: 'country', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.country} touched={touched.country}>
                  <option value="">Select an Option</option>
                  <option value="Philippines">Philippines</option>
                </Input>
                <Input input={{type: 'select', name: 'region', id: 'region', required: true, onChange: (e) => handleInputChange(e.target)}} error={errors.region} touched={touched.region}>
                  <option value="">Select an Option</option>
                  <option value="Metro Manila">Metro Manila</option>
                </Input>
              </div>
              <div className='flex gap-5'>
                <Field type='checkbox' name='termsAndConditions' id='termsAndConditions' onChange={(e) => handleInputChange(e.target)}/>
                <label htmlFor="termsAndConditions" style={{cursor: 'pointer'}}>I agree to the terms and conditions <span className={s.inputRequired}>*</span></label>
              </div>
              {errors.termsAndConditions && <span className={s.errorMsg}>{errors.termsAndConditions}</span>}
              {errors.shipping && touched.shipping && <span className={s.errorMsg}>{errors.shipping}</span>}
              {errors.drop_location && touched.drop_location && <span className={s.errorMsg}>{errors.drop_location}</span>}
              <Button
                text='Proceed to Next Step'
                type='submit'
                color='yellow'
                corners='sharp'
                disabled={!isValid}
              />
            </div>
          </section>
        </Form>
      )}
    </Formik>
  )
}

export default Information