import React from 'react'
import cn from 'classnames'

import s from './Footer.module.scss'

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className='container'>
          <div>
            <h2>ALL POLICY</h2>
            <ul style={{textAlign: 'center'}}>
              <li>Spoilage Policy</li>
              <li>Allergy Disclaimer</li>
              <li>Privacy Policy</li>
              <li>Weight Notice</li>
              <li>Return and Refund Policy</li>
            </ul>
          </div>
          <div>
            <h2>CONTACT US</h2>
            <ul>
              <li>Email: info@ruralrisingph.com</li>
              <li>Phone: 0917 502 7787</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.bottom}>
        <span>© Rural Rising PH, All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer