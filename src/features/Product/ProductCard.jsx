import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useGlobal, ACTIONS } from '@/context/GlobalContext'

import s from './ProductCard.module.scss'
import cartPlus from 'svg/cart-plus.svg'

function ProductCard(props) {
  const { productId, name, slug, variants } = props
  const { state, dispatch } = useGlobal()
  const navigate = useNavigate()

  const isOneVariant = variants.length === 1
  const isStocked = variants.map(v => v.stock).reduce((a, b) => a + b) > 0

  const getPrice = () => {
    if(isOneVariant)
      return `₱${variants[0].price.toLocaleString()}`
    
    const prices = variants.map(v => v.price)
    const minPrice = Math.min(...prices).toLocaleString()
    const maxPrice = Math.max(...prices).toLocaleString()

    return `₱${minPrice} - ₱${maxPrice}`
  }

  const handleCartClick = () => {
    if(!isStocked) return

    if(isOneVariant){
      const { variantId } = variants[0];
      const cartItem = {
        productId,
        variantId,
        quantity: 1,
      }

      const existingCartIndex = state.cart.findIndex(
        item => item.productId === productId && item.variantId === variantId
      )

      let updatedCart
      if (existingCartIndex > -1) {
        updatedCart = [...state.cart]
        updatedCart[existingCartIndex].quantity++
      } else {
        updatedCart = [...state.cart, cartItem]
      }

      dispatch({ type: ACTIONS.ADD_TO_CART, payload: updatedCart })
      toast.success("Item has been added to cart")
    }
    else{
      navigate(`/product/${slug}`)
    }
  }
  
  return (
    <li className={s.item}>
      <div className={s.imgCont}>
        <Link to={`/product/${slug}`} >
          <img src='https://placehold.co/270' alt={name} />
          {!isStocked &&
            <div className={s.outOfStock}>Out of Stock</div>
          }
        </Link>
      </div>
      <div className={s.textCont}>
        <div className='flex-col'>
          <b>{name}</b>
          <span>{getPrice()}</span>
        </div>
        <button onClick={() => handleCartClick()} disabled={!isStocked}>
          <img src={cartPlus} loading="lazy" alt="add-to-cart" />
        </button>
      </div>
    </li>
  )
}

export default ProductCard