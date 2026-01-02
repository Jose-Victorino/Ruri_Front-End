import { useState, useRef, useMemo } from 'react'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import QuantityInput from '@/components/QuantityInput/QuantityInput'

import s from './OrderSummary.module.scss'

import trashSVG from 'svg/trash.svg'
import ruriCoin from '@/assets/svg/ruri-coin.svg'

function OrderSummary () {
  const { state, dispatch } = useGlobal()
  const [ showOrder, setShowOrder ] = useState(false)
  const couponState = state?.checkoutInformation?.coupon
  const cartState = state.cart || []
  const couponRef = useRef(null)

  const shipping = state?.checkoutInformation?.shipping || ''

  const getProductVariantDetails = (productId, variantId) => {
    const product = state.PRODUCTS.find(p => p.productId === productId)
    if (!product) return null
    const variant = product.variants.find(v => v.variantId === variantId)
    return { product, variant }
  }

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
    
    if(couponCodes[value])
      dispatch({
        type: ACTIONS.UPDATE_CHECKOUT_INFORMATION,
        payload: { name: 'coupon', value: selectedCoupon },
      })
    else
      couponRef.current.setCustomValidity('Invalid or Expired Coupon')
  }

  const shippingVal = shipping === 'Weight Based Shipping' ? 250 : 0

  const { subtotal, discountedSub } = useMemo(() => {
    const sub = cartState.reduce((acc, id) => {
      const details = getProductVariantDetails(id.productId, id.variantId)
      const price = details?.variant?.price || 0
      const qty = Number(id.quantity || 0)
      return acc + price * qty
    }, 0)

    const couponVal = (couponState?.type === 'percent' ? sub * (couponState?.discount / 100) : couponState?.discount) || 0

    return {
      subtotal: sub,
      discountedSub: sub + shippingVal - couponVal
    }
  }, [cartState, couponState])  

  const totalItems = useMemo(() => {
    return cartState.reduce((acc, it) => acc + (Number(it.quantity || 0)), 0)
  }, [cartState])

  const totalRuriCoins = useMemo(() => {
    return cartState.reduce((acc, id) => {
      const details = getProductVariantDetails(id.productId, id.variantId)
      
      return acc + details.variant.ruriCoin
      
    }, 0)
  }, [cartState])

  return (
    <section className={cn(s.orderSummary, { [s.show]: showOrder })}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={showOrder}
        className={s.header}
        onClick={() => setShowOrder((prev) => !prev)}
      >
        <div className='flex gap-10 j-space-between a-center'>
          <h4>Order Summary</h4>
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/>
          </svg>
        </div>
        <div className='flex j-center a-center gap-20'>
          {totalRuriCoins > 0 &&
            <div className='flex gap-5 a-center'>
              <img src={ruriCoin} loading='lazy' alt="ruri coin" /> <b>{totalRuriCoins}</b>
            </div>
          }
          <strong>₱{discountedSub}</strong>
        </div>
      </div>
      <div className={s.content} aria-hidden={!showOrder}>
        <table>
          <tbody>
            {cartState.map((item) => {
              const { productId, variantId, quantity } = item
              const details = getProductVariantDetails(productId, variantId)

              if (!details) return null

              const { product: { name }, variant: { label, price, stock } } = details
              const isStocked = stock > 0

              return (
                <tr key={`${productId}-${variantId}`} className={cn({[s.notStocked]: !isStocked})}>
                  <td>
                    <div className={s.product}>
                      <div className='pos-r flex'>
                        <img src='https://placehold.co/80' loading='lazy' alt={name} />
                        <div className={s.floatCount}>{quantity}</div>
                      </div>
                      <div className='flex-col gap-5'>
                        <div className={s.txt}>
                          <p>{name}</p>
                          {label !== 'Default' &&
                            <span>variation: {label}</span>
                          }
                        </div>
                        <b>₱{price.toLocaleString()}</b>
                        {isStocked ?
                          <QuantityInput
                            state={quantity}
                            setState={(next) => updateQty(productId, variantId, next)}
                            productID={`${productId}-${variantId}`}
                            min={1}
                          />
                          : <span>Out of Stock</span>
                        }
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='flex-wrap j-end gap-5'>
                      <span>₱{(quantity * price).toLocaleString()}</span>
                      <button className={s.removeBtn} onClick={() => removeItem(productId, variantId)}>
                        <img src={trashSVG} loading='lazy' alt="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className={cn(s.couponCont)}>
          <input ref={couponRef} type="text" name='coupon-code' defaultValue={couponState?.code} placeholder='Coupon Code' autoComplete='off' autoCapitalize='off' autoCorrect='off'/>
          <button onClick={() => verifyCoupon()}>Apply</button>
        </div>
        <hr />
        <div>
          <div className='flex gap-15 j-space-between'>
            <p>Subtotal</p>
            <p>₱{subtotal}</p>
          </div>
          {couponState &&
            <div className='flex gap-15 j-space-between'>
              <p>Coupon Discount</p>
              <p>{couponState?.type === 'percent' ? `${couponState?.discount}%` : `₱${couponState?.discount}`}</p>
            </div>
          }
          <div className='flex gap-15 j-space-between'>
            <p>Shipping</p>
            <p>{shippingVal ? `₱${shippingVal}` : 'Free'}</p>
          </div>
        </div>
        <hr />
        <div className={cn('flex gap-15 j-space-between', s.total)}>
          <b>Total ({totalItems} {totalItems > 1 ? 'items' : 'item'})</b>
          <strong>₱{discountedSub}</strong>
        </div>
        {totalRuriCoins > 0 &&
          <div className={s.ruriCoin}>
            <span>Complete your order and earn</span> <img src={ruriCoin} loading='lazy' alt="ruri coin" /> <strong>{totalRuriCoins}</strong> <span>Ruri Coins for a discount on a future purchase</span>
          </div>
        }
      </div>
    </section>
  )
}

export default OrderSummary