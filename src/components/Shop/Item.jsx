import React from 'react'
import { Link } from 'react-router-dom'

import s from './Item.module.scss'
import cartPlus from 'svg/cart-plus.svg'

function Item(props) {
  const { name, slug, variants } = props

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
  
  return (
    <li className={s.item}>
      <div className={s.imgCont}>
        <Link to={`/product/${slug}`} >
          {/* <img src={``} alt={``} /> */}
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
        <button>
          <img src={cartPlus} loading="lazy" alt="add-to-cart" />
        </button>
      </div>
    </li>
  )
}

export default Item