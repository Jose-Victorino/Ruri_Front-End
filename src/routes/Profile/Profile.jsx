import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import s from './Profile.module.scss'

import edit from 'svg/pen-to-square.svg'
const plus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>

function Profile() {
  const { state, dispatch } = useGlobal()
  const { user } = state.auth
  
  // if(!user?.userId) return <Navigate to='/' />

  document.title = "RURI CLUB | Profile"

  const fullName = (user?.firstName && user?.lastName) ? `${user?.firstName} ${user?.lastName}` : ''
  
  return (
    <div className={cn("container", s.profile)}>
      <h3>Profile</h3>
      <section className='flex-col gap-10 pad-15'>
        <div className={s.heading}>
          <h4>{fullName}</h4>
          <button aria-label='Edit Profile'>
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
      <section className='flex-col gap-10 pad-15'>
        <div className={s.heading}>
          <h4>Address</h4>
          <button className={s.addAddressBtn} aria-label='Add Address'>
            {plus}
            <span>Add</span>
          </button>
        </div>
        {user?.address?.length > 0 ? (
          <ul>
            {user.address.map(() => {
              <li>
                <button></button>
              </li>
            })}
          </ul>
        ) : (
          <div className='pad-15'>
            <p>No Address Added</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile