import { useState } from 'react'
import { Outlet } from 'react-router-dom';

import s from './AuthLayout.module.scss'

function Login() {
  return (
    <section className={s.authWrapper}>
      <div className={s.left}>
        <img className={s.logo} src="/cropped-logo-600x203.png" alt="logo" />
      </div>
      <div className={s.right}>
        <Outlet />
      </div>
    </section>
  )
}

export default Login