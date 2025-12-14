import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import s from './Footer.module.scss'

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className='container'>
          <div className={s.main}>
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
              <div className='flex-col gap-15'>
                <ul className={s.contacts}>
                  <li>Email: info@ruralrisingph.com</li>
                  <li>Phone: 0917 502 7787</li>
                </ul>
                <ul className={s.socmed}>
                  <li>
                    <Link to='https://www.facebook.com/ruralrisingph' target='_blank'>
                      <img src="/src/assets/svg/facebook.svg" loading="lazy" alt="Facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link to='https://x.com/ruralrisingph' target='_blank'>
                      <img src="/src/assets/svg/x-twitter.svg" loading="lazy" alt="X" />
                    </Link>
                  </li>
                  <li>
                    <Link to='https://www.instagram.com/ruralrisingph/' target='_blank'>
                      <img src="/src/assets/svg/instagram.svg" loading="lazy" alt="Instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link to='https://www.tiktok.com/@ruralrisingph' target='_blank'>
                      <img src="/src/assets/svg/tiktok.svg" loading="lazy" alt="Tiktok" />
                    </Link>
                  </li>
                  <li>
                    <Link to='https://www.youtube.com/@ruralrisingphilippines1993' target='_blank'>
                      <img src="/src/assets/svg/youtube.svg" loading="lazy" alt="YouTube" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={s.mop}>
            <figure>
              <img src="/src/assets/mop/atome.svg" loading="lazy" alt="atome" />
            </figure>
            <figure>
              <img src="/src/assets/mop/visa-mastercard.png" loading="lazy" alt="visa" />
            </figure>
            <figure>
              <img src="/src/assets/mop/paymongo_gcash.png" loading="lazy" alt="gcash" />
            </figure>
            <figure>
              <img src="/src/assets/mop/paymongo_grab_pay.png" loading="lazy" alt="grab pay" />
            </figure>
            <figure>
              <img src="/src/assets/mop/Maya_logo.png" loading="lazy" alt="maya" />
            </figure>
            <figure>
              <img src="/src/assets/mop/bpi.png" loading="lazy" alt="bpi" />
            </figure>
            <figure>
              <img src="/src/assets/mop/billease.svg" loading="lazy" alt="billease" />
            </figure>
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