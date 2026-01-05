import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Input/Input.formik'


import s from './Profile.module.scss'

import edit from 'svg/pen-to-square.svg'

const plus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>

const infoValidation = Yup.object().shape({
  firstName: Yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required').matches(/^[0-9]{11,}$/, 'Phone number must be at least 11 digits'),
})

const addressValidation = Yup.object().shape({
  street: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  postcode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required'),
  region: Yup.string().required('Region is required'),
})

function Profile() {
  const { state, dispatch } = useGlobal()
  const [openModal, setOpenModal] = useState({type: ''})
  const { user } = state.auth
  const { address } = user
  
  if(!user.userId) return <Navigate to='/' />

  document.title = "RURI CLUB | Profile"

  const fullName = (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : ''
  
  const UserInfoModal = () => {

    const handleSubmit = (values) => {
      dispatch({ type: ACTIONS.SET_USER_INFORMATION, payload: values })
      toast.info('Your information has been updated')
      setOpenModal({type: ''})
    }

    return (
      <Modal
        title='Edit Information'
        width='800px'
        onClose={() => setOpenModal({type: ''})}
      >
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            birthday: user.birthday,
          }}
          validationSchema={infoValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched, isValid }) => (
            <Form className='flex-col gap-15'>
              <div className={s.inputGroup}>
                <Input displayName='First Name' input={{type: 'text', name: 'firstName', id: 'firstName', required: true}} error={errors.firstName} touched={touched.firstName}/>
                <Input displayName='Last Name' input={{type: 'text', name: 'lastName', id: 'lastName', required: true}} error={errors.lastName} touched={touched.lastName}/>
              </div>
              <Input input={{type:'text', name: 'email', id: 'email', required: true}} error={errors.email} touched={touched.email}/>
              <Input displayName='Phone Number' input={{type:'text', name: 'phoneNumber', id: 'phoneNumber', required: true}} error={errors.phoneNumber} touched={touched.phoneNumber}/>
              <Button
                text='Confirm'
                type='submit'
                color='green'
                disabled={!isValid}
              />
            </Form>
          )}
        </Formik>
      </Modal>
    )
  }
  const AddressModal = ({ type, id }) => {
    const initialValues = type === 'add' ? {
      barangay: '',
      street: '',
      city: '',
      postcode: '',
      country: 'Philippines',
      region: 'Metro Manila',
      isDefault: false,
    }
    : address.find(a => a.addressId === id)

    const handleSubmit = (values) => {
      if(type === 'add') {
        dispatch({ type: ACTIONS.ADD_ADDRESS, payload: values })
        toast.info('Address has been added')
      } else {
        dispatch({ type: ACTIONS.UPDATE_ADDRESS, payload: { ...values, addressId: id } })
        toast.info('Address has been updated')
      }
      setOpenModal({type: ''})
    }

    return (
      <Modal
        title={type === 'add' ? 'Add Address' : 'Edit Address'}
        width='800px'
        onClose={() => setOpenModal({type: ''})}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={addressValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched, isValid }) => (
            <Form className='flex-col gap-15'>
              <Input input={{type: 'text', name: 'barangay', id: 'barangay'}} error={errors.barangay} touched={touched.barangay}/>
              <Input input={{type:'text', name: 'street', id: 'street', required: true}} error={errors.street} touched={touched.street}/>
              <div className={s.inputGroup}>
                <Input input={{type:'text', name: 'city', id: 'city', required: true}} error={errors.city} touched={touched.city}/>
                <Input input={{type:'number', name: 'postcode', id: 'postcode', required: true}} error={errors.postcode} touched={touched.postcode}/>
              </div>
              <div className={s.inputGroup}>
                <Input input={{type: 'select', name: 'country', id: 'country', required: true}} error={errors.country} touched={touched.country}>
                  <option value="">Select an Option</option>
                  <option value="Philippines">Philippines</option>
                </Input>
                <Input input={{type: 'select', name: 'region', id: 'region', required: true}} error={errors.region} touched={touched.region}>
                  <option value="">Select an Option</option>
                  <option value="Metro Manila">Metro Manila</option>
                </Input>
              </div>
              <div className='flex gap-5'>
                <Field type='checkbox' name='isDefault' id='isDefault'/>
                <label htmlFor="isDefault" style={{cursor: 'pointer'}}>Set this address to default</label>
              </div>
              <Button
                text='Confirm'
                type='submit'
                color='green'
                disabled={!isValid}
              />
            </Form>
          )}
        </Formik>
      </Modal>
    )
  }

  const handleAddressDelete = (id) => {
    dispatch({ type: ACTIONS.DELETE_ADDRESS, payload: id })
    toast.info('Address has been deleted')
  }

  const handleSetDefault = (id) => {
    dispatch({ type: ACTIONS.SET_DEFAULT_ADDRESS, payload: id })
  }
  
  return (
    <div className={cn("container", s.profile)}>
      <h3>Profile</h3>
      <section className='flex-col gap-10 pad-20'>
        <div className={s.heading}>
          <h4>{fullName}</h4>
          <button
            aria-label='Edit Profile'
            onClick={() => setOpenModal({type: 'info'})}
          >
            <img src={edit} loading='lazy' alt="edit" />
          </button>
        </div>
        <div className='flex-col'>
          <span className={s.title}>Email</span>
          <span>{user.email}</span>
        </div>
        <div className='flex-col'>
          <span className={s.title}>Phone Number</span>
          <span>{user.phoneNumber}</span>
        </div>
      </section>
      <section className='flex-col gap-10 pad-20'>
        <div className={cn(s.heading, 'j-space-between')}>
          <h4>Address</h4>
          <Button
            color='yellow'
            text='Add'
            icon={plus}
            onClick={() => setOpenModal({type: 'add'})}
          />
        </div>
        {address?.length > 0 ? (
          <ul>
            {address.map((a) => {
              const address = [a.barangay, a.street, a.city, a.region, a.postcode, a.country].filter(s => (s != null && s !== '')).join(', ')

              return (
                <li key={a.addressId} className={s.addressItem}>
                  <div className={cn(s.left, 'flex-col gap-10')}>
                    <p>{address}</p>
                    <div className={cn(s.defaultTxt, {[s.defaultAddress]: a.isDefault})}>Default</div>
                  </div>
                  <div className={cn(s.right, 'flex-col gap-10')}>
                    <div className='flex gap-15'>
                      <Button
                        btnType='tertiary'
                        text='Edit'
                        onClick={() => setOpenModal({type: 'edit', id: a.addressId})}
                      />
                      <Button
                        btnType='tertiary'
                        text='Delete'
                        onClick={() => handleAddressDelete(a.addressId)}
                      />
                    </div>
                    <Button
                      text='Set as Default'
                      corners='sharp'
                      color='green'
                      disabled={a.isDefault}
                      onClick={() => handleSetDefault(a.addressId)}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className='pad-15'>
            <p>No Address Added</p>
          </div>
        )}
        {['add', 'edit'].includes(openModal.type) && <AddressModal {...openModal}/>}
        {['info'].includes(openModal.type) && <UserInfoModal />}
      </section>
    </div>
  )
}

export default Profile