import React from 'react'
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import OrderSummary from '../routes/Checkout/OrderSummary'

import s from './CheckoutLayout.module.scss'

function Layout() {
  const { state, dispatch } = useGlobal()
  const location = useLocation()
  const cartState = state.cart

  const getProductVariantDetails = (productId, variantId) => {
    const product = state.PRODUCTS.find(p => p.productId === productId)
    if (!product) return null
    const variant = product.variants.find(v => v.variantId === variantId)
    return { product, variant }
  }

  const isInformationComplete = () => {
    if (!state.checkoutInformation) return false
    
    const { firstName, lastName, email, phoneNumber, street, city, postcode, country, region, termsAndConditions, shipping, drop_location } = state.checkoutInformation
    
    const requiredFilled = firstName && lastName && email && phoneNumber && street && city && postcode && country && region && termsAndConditions
    
    if (shipping === 'Personal Pickup' && !drop_location) return false
    
    return requiredFilled && shipping
  }

  const containsOutOfStock = cartState?.reduce((acc, id) => {
    if(acc) return acc
    const details = getProductVariantDetails(id.productId, id.variantId)
    
    return details?.variant?.stock < 1
  }, false)
  
  if(!location.state?.fromValidSource || containsOutOfStock || cartState?.length < 1)
    return <Navigate to='/cart' replace />
  
  document.title = "RURI CLUB | Checkout"
  
  return (
    <div className={cn('container flex-col gap-20 pad-block-60', s.checkout)}>
      <nav className={s.breadcrumbs}>
        <NavLink to='/cart'>Cart</NavLink>
        <span className={s.divider}>{'>'}</span>
        <NavLink to='/checkout/information' state={{ fromValidSource: true }} className={({ isActive }) => cn({[s.active]: isActive})}>Information</NavLink>
        <span className={s.divider}>{'>'}</span>
        {isInformationComplete() ? (
          <NavLink to='/checkout/payment' state={{ fromValidSource: true }} className={({ isActive }) => cn({[s.active]: isActive})}>Payment</NavLink>
        ) : (
          <span className={cn(s.disabled)}>Payment</span>
        )}
      </nav>
      <div className={s.grid}>
        <Outlet />
        <OrderSummary />
      </div>
    </div>
  )
}

export default Layout