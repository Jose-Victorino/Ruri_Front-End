import React from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import s from './OrderConfirmation.module.scss'

import circleCheck from 'svg/circle-check.svg'
import ruriCoin from '@/assets/svg/ruri-coin.svg'
import mopGcash from '@/assets/mop/paymongo_gcash.png'

function OrderConfirmation() {
  const navigate = useNavigate()

  return (
    <div className={cn('container pad-block-40', s.OrderConfirmation)}>
      <div className={s.left}>
        <div className='flex-col'>
          <div className='flex gap-10 a-center'>
            <img className={s.circleCheck} src={circleCheck} loading='lazy' alt="check" />
            <h3>Thank you for your Purchase!</h3>
          </div>
          <p>A confirmation email has been sent to you</p>
        </div>
        <div className='flex-col gap-5'>
          <h4>Billing Information</h4>
          <ul className={s.infoGrid}>
            <li>
              <span className={s.title}>Name</span>
              <span className={s.txt}>Mark Artista</span>
            </li>
            <li>
              <span className={s.title}>Address</span>
              <span className={s.txt}>Brgy. South Triangle, Sct. Borromeo, Quezon City, Metro Manila, 1008, Philippines</span>
            </li>
            <li>
              <span className={s.title}>Phone</span>
              <span className={s.txt}>09994536241</span>
            </li>
            <li>
              <span className={s.title}>Email</span>
              <span className={s.txt}>user@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.right}>
        <h4>Your Order</h4>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className={s.product}>
                    <div className='pos-r flex'>
                      <img src='https://placehold.co/80' loading='lazy' alt='Furry Friends Box' />
                      <div className={s.floatCount}>2</div>
                    </div>
                    <div className='flex-col gap-5'>
                      <div className={s.txt}>
                        <p>Furry Friends Box</p>
                        <span>variation: Daily Bowl</span>
                      </div>
                      <b>₱799</b>
                    </div>
                  </div>
                </td>
                <td>
                  <span>₱1598</span>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div>
            <div className='flex gap-15 j-space-between'>
              <p>Subtotal</p>
              <p>₱1598</p>
            </div>
            <div className='flex gap-15 j-space-between'>
              <p>Coupon Discount</p>
              <p>₱200</p>
            </div>
            <div className='flex gap-15 j-space-between'>
              <p>Shipping</p>
              <p>Free</p>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className={cn('flex gap-15 j-space-between', s.total)}>
            <b>Total (2 items)</b>
            <strong>₱1398</strong>
          </div>
          <div className={s.ruriCoin}>
            <span>You earned</span> <img src={ruriCoin} loading='lazy' alt="ruri coin" /> <strong>5</strong> <span>Ruri Coins</span>
          </div>
        </div>
        <hr />
        <div className='flex gap-15 j-space-between'>
          <p>Payment Method</p>
          <img src={mopGcash} loading="lazy" height='32' alt="gcash" />
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation