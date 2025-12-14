import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import s from './Footer.module.scss'

import facebookIcon from '@/assets/svg/facebook.svg'
import xIcon from '@/assets/svg/x-twitter.svg'
import instagramIcon from '@/assets/svg/instagram.svg'
import tiktokIcon from '@/assets/svg/tiktok.svg'
import youtubeIcon from '@/assets/svg/youtube.svg'

import mopAtome from '@/assets/mop/atome.svg'
import mopVisa from '@/assets/mop/visa-mastercard.png'
import mopGcash from '@/assets/mop/paymongo_gcash.png'
import mopGrab from '@/assets/mop/paymongo_grab_pay.png'
import mopMaya from '@/assets/mop/Maya_logo.png'
import mopBpi from '@/assets/mop/bpi.png'
import mopBillease from '@/assets/mop/billease.svg'

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
                      <img src={facebookIcon} loading="lazy" alt="Facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link to='https://x.com/ruralrisingph' target='_blank'>
                      <img src={xIcon} loading="lazy" alt="X" />
                    </Link>
                  </li>
                  <li>
                    <Link to='https://www.instagram.com/ruralrisingph/' target='_blank'>
                      <img src={instagramIcon} loading="lazy" alt="Instagram" />
                    </Link>
                  </li>
                  <li>
                    <Link to='https://www.tiktok.com/@ruralrisingph' target='_blank'>
                      <img src={tiktokIcon} loading="lazy" alt="Tiktok" />
                    </Link>
                  </li>
                  <li>
                    <Link to='https://www.youtube.com/@ruralrisingphilippines1993' target='_blank'>
                      <img src={youtubeIcon} loading="lazy" alt="YouTube" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={s.mop}>
            <figure>
              <img src={mopAtome} loading="lazy" alt="atome" />
            </figure>
            <figure>
              <img src={mopVisa} loading="lazy" alt="visa" />
            </figure>
            <figure>
              <img src={mopGcash} loading="lazy" alt="gcash" />
            </figure>
            <figure>
              <img src={mopGrab} loading="lazy" alt="grab pay" />
            </figure>
            <figure>
              <img src={mopMaya} loading="lazy" alt="maya" />
            </figure>
            <figure>
              <img src={mopBpi} loading="lazy" alt="bpi" />
            </figure>
            <figure>
              <img src={mopBillease} loading="lazy" alt="billease" />
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