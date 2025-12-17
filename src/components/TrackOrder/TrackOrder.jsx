import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import s from './TrackOrder.module.scss'

import magnifyingGlass from 'svg/magnifying-glass.svg'

function TrackOrder() {
  document.title = "RURI CLUB | Track Order"

  return (
    <>
      <section>
        <div className={cn('container', s.header)}>
          <h3>Join our Viber channel for Dispatch Notices</h3>
          <button>
            <NavLink to='https://bit.ly/RRPHViberChannel' target='_blank'>Join Now</NavLink>
          </button>
        </div>
      </section>
      <section className={s.tracking}>
        <div className='container'>
          <p>Enter your Order ID that can be found in your order confirmation email</p>
          <div>
            <div className={s.searchBar}>
              <input type="text" name='orderID' placeholder='Enter Order ID'/>
              <img alt="search" loading="lazy" src={magnifyingGlass}></img>
            </div>
            <div className={s.body}>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TrackOrder