import React from 'react'
import { useParams, NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import s from './Navigation.module.scss'

function Navigation() {
  /**
   * TODO:
   * Responsive layout
   * Dynamic cart number
   * Search functionality
   */

  return (
    <header className={s.header}>
      <section className={s.top}>
        <div className='container'>
          <nav>
            <ul className={s.navLinks}>
              <li>
                <NavLink to='/login' className={({isActive}) => cn({ [s.active] : isActive })}>
                  LOGIN
                </NavLink>
              </li>
              <li>
                <NavLink to='/sign-up' className={({isActive}) => cn({ [s.active] : isActive })}>
                  SIGN UP
                </NavLink>
              </li>
            </ul>
          </nav>
          <button className={s.cart}>
            <img src="/src/assets/svg/cart-shopping.svg" alt="cart" />
            <span>0</span>
          </button>
        </div>
      </section>
      <section className={s.bottom}>
        <div className='container'>
          <div className={s.logo}>
            <NavLink to='/'>
              <img src="/cropped-logo-600x203.png" alt="logo" />
            </NavLink>
          </div>
          <nav>
            <ul className={s.navLinks}>
              <li>
                <NavLink to='/' className={({isActive}) => cn({ [s.active] : isActive })}>
                  SHOP
                </NavLink>
              </li>
              <li>
                <NavLink to='/about' className={({isActive}) => cn({ [s.active] : isActive })}>
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink to='/membership' className={({isActive}) => cn({ [s.active] : isActive })}>
                  MEMBERSHIP
                </NavLink>
              </li>
              <li>
                <NavLink to='/faqs' className={({isActive}) => cn({ [s.active] : isActive })}>
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink to='/track-order' className={({isActive}) => cn({ [s.active] : isActive })}>
                  TRACK ORDER
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={s.searchBar}>
            <input type="text" name='search' placeholder='Search...' autoComplete="false"/>
            <button>
              <img src="/src/assets/svg/magnifying-glass.svg" alt="search" />
            </button>
          </div>
        </div>
      </section>
    </header>
  )
}

export default Navigation