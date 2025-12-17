import { useRef, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import QuantityInput from '@/components/Util/QuantityInput/QuantityInput'

import s from './Cart.module.scss'

import trashSVG from 'svg/trash.svg'

function Cart() {
  const { state, dispatch } = useGlobal()
  const itemsState = state.cart || []
  const couponRef = useRef(null)
  
  document.title = 'RURI CLUB | Cart'

  // Helper function to get product and variant details by IDs
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
  
  const subtotal = useMemo(() => {
    return itemsState.reduce((acc, it) => {
      const details = getProductVariantDetails(it.productId, it.variantId)
      const price = details?.variant?.price || 0
      const qty = Number(it.quantity || 0)
      return acc + price * qty
    }, 0)
  }, [itemsState, state.PRODUCTS])

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
              {itemsState.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                    Your cart is empty
                  </td>
                </tr>
              ) : (
                itemsState.map((item) => {
                  const details = getProductVariantDetails(item.productId, item.variantId)
                  if (!details) return null

                  const { product, variant } = details
                  const { name, slug } = product
                  const { label, price } = variant
                  const { quantity } = item

                  return (
                    <tr key={`${item.productId}-${item.variantId}`}>
                      <td>
                        <div className={s.product}>
                          <img src='https://placehold.co/80' loading='lazy' alt={name} />
                          <div className='flex-col gap-5'>
                            <NavLink to={`/product/${slug}`}>{name}</NavLink>
                            {label !== 'Default' &&
                              <span>variation: {label}</span>
                            }
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='flex'>
                          <span>₱{price.toLocaleString()}</span>
                        </div>
                      </td>
                      <td>
                        <div className='flex a-center gap-10'>
                          <QuantityInput
                            state={quantity}
                            setState={(next) => updateQty(item.productId, item.variantId, next)}
                            productID={`${item.productId}-${item.variantId}`}
                            min={1}
                          />
                          <button className={s.removeBtn} onClick={() => removeItem(item.productId, item.variantId)}>
                            <img src={trashSVG} loading='lazy' alt="trash" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className='flex'>
                          <span>₱{(quantity * price).toLocaleString()}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
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