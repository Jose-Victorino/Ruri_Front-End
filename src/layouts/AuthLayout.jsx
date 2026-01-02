import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import s from './AuthLayout.module.scss'

import logo from '/cropped-logo-600x203.png'
import arrowLeft from 'svg/arrow-left.svg'

function Login() {
  const navigate = useNavigate()

  return (
    <section className={s.authWrapper}>
      <div className={s.left}>
        <img className={s.logo} src={logo} loading="lazy" alt="logo" />
      </div>
      <div className={s.right}>
        <button type="button" className={s.goBackbtn} onClick={() => navigate(-1)}>
          <div>
            <img src={arrowLeft} loading="lazy" alt="arrow" />
          </div>
          <span>Go Back</span>
        </button>
        <Outlet />
      </div>
    </section>
  )
}

export default Login