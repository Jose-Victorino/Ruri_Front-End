import { useRef, useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import { useCart } from '@/hooks/useCart'
import cn from 'classnames'

import QuantityInput from '@/components/QuantityInput/QuantityInput'
import { ScrollResetEffect } from '@/library/Util'

import s from './Cart.module.scss'

import trashSVG from 'svg/trash.svg'
import ruriCoin from '@/assets/svg/ruri-coin.svg'

function Cart() {
  const navigate = useNavigate()
  const { state, dispatch } = useGlobal()
  const { cart, removeFromCart, updateQuantity, getProductVariantDetails, cartTotals, getDiscountedSubtotal } = useCart()
  const couponState = state?.checkoutInformation?.coupon
  const couponRef = useRef(null)

  document.title = 'RURI CLUB | Cart'
  
  ScrollResetEffect()
  
  const verifyCoupon = () => {
    if(!couponRef.current.reportValidity()) return
    
    const { value } = couponRef.current
    const couponCodes = state.COUPON.reduce((prev, acc) => ({...prev, [acc.code]: acc}), {})
    const selectedCoupon = couponCodes[value]

    if(selectedCoupon)
      dispatch({
        type: ACTIONS.UPDATE_CHECKOUT_INFORMATION,
        payload: { name: 'coupon', value: selectedCoupon },
      })
    else
      couponRef.current.setCustomValidity('Invalid or Expired Coupon')
  }
  
  const discountedSub = useMemo(() => {
    return getDiscountedSubtotal(couponState)
  }, [couponState, getDiscountedSubtotal])

  const totalItems = useMemo(() => {
    return cartTotals.totalItems
  }, [cartTotals.totalItems])

  const initCheckout = () => {
    if(cartTotals.containsOutOfStock) return toast.info("Remove out of stock items");
    
    if(totalItems > 0) navigate('/checkout/information', { state: { fromValidSource: true } })
  }

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
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                    Your cart is empty
                  </td>
                </tr>
              ) : (
                cart.map((item) => {
                  const { productId, variantId, quantity } = item
                  const details = getProductVariantDetails(productId, variantId)
                  
                  if (!details) return null

                  const { product: { name, slug }, variant: { label, price, ruriCoin, stock } } = details

                  const isStocked = stock > 0

                  return (
                    <tr key={`${productId}-${variantId}`} className={cn({[s.notStocked]: !isStocked})}>
                      <td>
                        <div className={s.product}>
                          <img src='https://placehold.co/80' loading='lazy' alt={name} />
                          <div className='flex-col gap-5'>
                            <NavLink to={`/product/${slug}`}>{name}</NavLink>
                            {label !== 'Default' &&
                              <span>variation: {label}</span>
                            }
                            <p>₱{price.toLocaleString()}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='flex-wrap a-center gap-5-10'>
                          {isStocked ?
                            <QuantityInput
                              state={quantity}
                              setState={(next) => updateQuantity(productId, variantId, next)}
                              productID={`${productId}-${variantId}`}
                              min={1}
                            />
                            : <span>Out of Stock</span>
                          }
                          <button className={s.removeBtn} onClick={() => removeFromCart(productId, variantId)}>
                            <img src={trashSVG} loading='lazy' alt="trash" />
                          </button>
                        </div>
                      </td>
                      <td>
                        {isStocked &&
                          <div className='flex'>
                            <span>₱{(quantity * price).toLocaleString()}</span>
                          </div>
                        }
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
          <div className={s.couponCont}>
            <input ref={couponRef} type="text" name='coupon-code' defaultValue={couponState?.code} placeholder='Coupon Code' autoComplete='off' autoCapitalize='off' autoCorrect='off' required/>
            <button onClick={() => verifyCoupon()}>Apply</button>
          </div>
        </div>
      </section>
      <section className={s.checkout}>
        <div className='container'>
          <div className='flex-col gap-10'>
            <div className='flex-wrap gap-10 a-center'>
              <p>{`Subtotal: (${totalItems} item${totalItems > 1 ? 's' : ''})`}</p>
              <div className='flex-col a-end'>
                {couponState ? (
                  <>
                    <strong className={s.subtotal}>₱{discountedSub.toLocaleString()}</strong>
                    <strong className={s.prevSubtotal}>₱{cartTotals.subtotal.toLocaleString()}</strong>
                  </>
                ) : (
                  <strong className={s.subtotal}>₱{cartTotals.subtotal.toLocaleString()}</strong>
                )}
              </div>
            </div>
            {cartTotals.totalRuriCoin > 0 &&
              <div className={s.ruriCoin}>
                <span>You will earn</span> <img src={ruriCoin} loading='lazy' alt="ruri coin" /> <strong>{cartTotals.totalRuriCoin}</strong> <span>Ruri Coins!</span>
              </div>
            }
          </div>

          <button className={s.checkoutBtn} onClick={() => initCheckout()}>Checkout</button>
        </div>
      </section>
    </div>
  )
}

export default Cart