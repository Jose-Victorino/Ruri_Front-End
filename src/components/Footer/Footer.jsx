import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { ScrollReset } from '@/library/Util'

import s from './Footer.module.scss'

import facebookIcon from 'svg/facebook.svg'
import xIcon from 'svg/x-twitter.svg'
import instagramIcon from 'svg/instagram.svg'
import tiktokIcon from 'svg/tiktok.svg'
import youtubeIcon from 'svg/youtube.svg'

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
              <h2>QUICK LINKS</h2>
              <ul style={{textAlign: 'center'}}>
                <li>
                  <Link to='/' onClick={() => ScrollReset()}>Shop</Link>
                </li>
                <li>
                  <Link to='/membership' onClick={() => ScrollReset()}>Membership</Link>
                </li>
                <li>
                  <Link to='https://ruralrisingph.com' onClick={() => ScrollReset()}>About</Link>
                </li>
                <li>
                  <Link to='/events' onClick={() => ScrollReset()}>Events</Link>
                </li>
                <li>
                  <Link to='/track-order' onClick={() => ScrollReset()}>Track Order</Link>
                </li>
                <li>
                  <Link to='/store-locations' onClick={() => ScrollReset()}>Store Locations</Link>
                </li>
                <li>
                  <Link to='/faqs' onClick={() => ScrollReset()}>FAQs</Link>
                </li>
                <li>
                  <Link to='/policies' onClick={() => ScrollReset()}>Policies</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>CONTACT US</h2>
              <div className='flex-col gap-15'>
                <ul className={s.contacts}>
                  <li>
                    <a href="mailto:info@ruralrisingph.com">Email: info@ruralrisingph.com</a>
                  </li>
                  <li>
                    <a href='tel:09175027787'>Phone: 0917 502 7787</a>
                  </li>
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