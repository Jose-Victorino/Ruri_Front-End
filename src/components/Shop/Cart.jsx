import { useState, useRef, useMemo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import QuantityInput from '@/components/Util/QuantityInput/QuantityInput'
import { ScrollResetEffect } from '@/components/Util/Util'

import s from './Cart.module.scss'

import trashSVG from 'svg/trash.svg'
import ruriCoin from '@/assets/svg/ruri-coin.svg'

function Cart() {
  const navigate = useNavigate()
  const { state, dispatch } = useGlobal()
  const couponState = state?.checkoutInformation?.coupon
  const cartState = state.cart || []
  const couponRef = useRef(null)

  document.title = 'RURI CLUB | Cart'

  let totalRuriCoin = 0
  
  ScrollResetEffect()

  const getProductVariantDetails = (productId, variantId) => {
    const product = state.PRODUCTS.find(p => p.productId === productId)
    if (!product) return null
    const variant = product.variants.find(v => v.variantId === variantId)
    return { product, variant }
  }

  const containsOutOfStock = useMemo(() => {
    return cartState.reduce((acc, id) => {
      if(acc) return acc
      const details = getProductVariantDetails(id.productId, id.variantId)
      
      return details?.variant?.stock < 1
    }, false)
  }, [cartState])

  const updateQty = (productId, variantId, next) => {
    dispatch({
      type: ACTIONS.UPDATE_ITEM_QTY,
      payload: { productId, variantId, quantity: next }
    })
  }

  const removeItem = (productId, variantId) => {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: { productId, variantId }
    })
  }
  
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
  
  const { subtotal, discountedSub } = useMemo(() => {
    const sub = cartState.reduce((acc, id) => {
      const details = getProductVariantDetails(id.productId, id.variantId)
      
      const price = details?.variant?.stock > 0 ? details?.variant?.price || 0 : 0
      const qty = Number(id.quantity || 0)
      return acc + price * qty
    }, 0)

    const couponVal = (couponState?.type === 'percent' ? sub * (couponState?.discount / 100) : couponState?.discount) || 0

    return {
      subtotal: sub,
      discountedSub: sub - couponVal
    }
  }, [cartState, couponState])

  const totalItems = useMemo(() => {
    return cartState.reduce((acc, id) => acc + (Number(id.quantity || 0)), 0)
  }, [cartState])

  const initCheckout = () => {
    if(containsOutOfStock) return toast.info("Remove out of stock items");
    
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
              {cartState.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                    Your cart is empty
                  </td>
                </tr>
              ) : (
                cartState.map((item) => {
                  const { productId, variantId, quantity } = item
                  const details = getProductVariantDetails(productId, variantId)
                  
                  if (!details) return null

                  const { product: { name, slug }, variant: { label, price, ruriCoin, stock } } = details

                  const isStocked = stock > 0
                  totalRuriCoin += isStocked ? ruriCoin : 0

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
                              setState={(next) => updateQty(productId, variantId, next)}
                              productID={`${productId}-${variantId}`}
                              min={1}
                            />
                            : <span>Out of Stock</span>
                          }
                          <button className={s.removeBtn} onClick={() => removeItem(productId, variantId)}>
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
                    <strong className={s.prevSubtotal}>₱{subtotal.toLocaleString()}</strong>
                  </>
                ) : (
                  <strong className={s.subtotal}>₱{subtotal.toLocaleString()}</strong>
                )}
              </div>
            </div>
            {totalRuriCoin > 0 &&
              <div className={s.ruriCoin}>
                <span>You will earn</span> <img src={ruriCoin} loading='lazy' alt="ruri coin" /> <strong>{totalRuriCoin}</strong> <span>Ruri Coins!</span>
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