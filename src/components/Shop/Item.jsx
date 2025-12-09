import React from 'react'
import { useParams, NavLink, Link, Routes, Route, useNavigate } from 'react-router-dom'

import s from './Item.module.scss'

function Item() {
  return (
    <li className={s.item}>
      <div className={s.imgCont}>
        <Link>
          
        </Link>
      </div>
      <div className={s.textCont}>
        <div className='flex-col'>
          <b>asdasdasdawd</b>
          <span>1000</span>
        </div>
        <button>
          <img src="/src/assets/svg/cart-plus.svg" loading="lazy" alt="add-to-cart" />
        </button>
      </div>
    </li>
  )
}

export default Item