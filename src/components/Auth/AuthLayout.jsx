import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import s from './AuthLayout.module.scss'

import logo from '/cropped-logo-600x203.png'

function Login() {
  return (
    <section className={s.authWrapper}>
      <div className={s.left}>
        <img className={s.logo} src={logo} loading="lazy" alt="logo" />
      </div>
      <div className={s.right}>
        <Outlet />
      </div>
    </section>
  )
}

export default Login