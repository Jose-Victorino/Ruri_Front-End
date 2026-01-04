import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'

import s from './ProductCard.module.scss'
import cartPlus from 'svg/cart-plus.svg'

function ProductCard(props) {
  const { productId, name, slug, variants } = props
  const navigate = useNavigate()
  const { addToCart } = useCart()

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
      const { variantId } = variants[0]
      addToCart(productId, variantId, 1)
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