import { useRef, useMemo } from 'react'
import { useParams, NavLink, Link, useNavigate } from 'react-router-dom'
import { useGlobal } from '@/context/GlobalContext'
import cn from 'classnames'

import QuantityInput from '@/components/Util/QuantityInput/QuantityInput'

import s from './Cart.module.scss'

import trashSVG from '@/assets/svg/trash.svg'

function Cart() {
  const { state, dispatch } = useGlobal();
  const itemsState = state.cart || []
  const couponRef = useRef(null)
  
  document.title = 'RURI CLUB | Cart'

  const updateQty = (index, next) => {
    const copy = itemsState.map((it, i) => i === index ? { ...it, quantity: next } : it)
    dispatch({ type: 'SET_CART', payload: copy })
  }
  console.log(itemsState);
  
  const subtotal = useMemo(() => {
    return itemsState.reduce((acc, it) => {
      const price = it?.variant?.price || it.price || 0
      const qty = Number(it.quantity || 0)
      return acc + price * qty
    }, 0)
  }, [itemsState])

  const totalItems = useMemo(() => {
    return itemsState.reduce((acc, it) => acc + (Number(it.quantity || 0)), 0)
  }, [itemsState])

  return (
    <div className='flex-col gap-20 pad-block-40'>
      <header className={s.header}>
        <div className='container'>
          <h3>Your Cart</h3>
          <div>
            <NavLink to='/'>Continue Shopping</NavLink>
          </div>
        </div>
      </header>
      <section className={s.cart}>
        <div className='container'>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {itemsState.map((item, i) => {
                const { name, quantity } = item;
                const price = item?.variant?.price || item.price

                return (
                  <tr key={`${name}-${i}`}>
                    <td>
                      <div className={s.product}>
                        <img src='https://placehold.co/80' loading='lazy' alt={name} />
                        <div className='flex-col gap-5'>
                          <NavLink to={`/product/${name.toLowerCase().replaceAll(' ', '-')}`}>{name}</NavLink>
                          {item?.variant &&
                            <span>variation: {item.variant.name}</span>
                          }
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='flex'>
                        <span>₱{price}</span>
                      </div>
                    </td>
                    <td>
                      <div className='flex a-center gap-10'>
                        <QuantityInput
                          state={quantity}
                          setState={(next) => updateQty(i, next)}
                          productID={`${name}-${i}`}
                        />
                        <button className={s.removeBtn} onClick={() => {
                          const copy = itemsState.filter((_, idx) => idx !== i)
                          dispatch({ type: 'SET_CART', payload: copy })
                        }}>
                          <img src={trashSVG} loading='lazy' alt="trash" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className='flex'>
                        <span>₱{quantity * price}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className={s.couponCont}>
            <input ref={couponRef} type="text" name='coupon-code' placeholder='Coupon Code' />
            <button>Apply Coupon</button>
          </div>
        </div>
      </section>
      <section className={s.checkout}>
        <div className='container'>
          <div>
            <span>Subtotal: ({totalItems} {totalItems > 1 ? 'items' : 'item'})</span> <span className={s.subtotal}>₱{subtotal.toLocaleString()}</span>
          </div>

          <button className={s.checkoutBtn}>Checkout</button>
        </div>
      </section>
    </div>
  )
}

export default Cart