import React from 'react'
import { useParams, NavLink, Link, Routes, Route, useNavigate } from 'react-router-dom'

import s from './Item.module.scss'
import cartPlus from '../../assets/svg/cart-plus.svg'

function Item() {
  return (
    <li className={s.item}>
      <div className={s.imgCont}>
        <Link to='/product/asd' >
          {/* <img src={``} alt={``} /> */}
        </Link>
      </div>
      <div className={s.textCont}>
        <div className='flex-col'>
          <b>Lorem, ipsum.</b>
          <span>{`₱${1000}`}</span>
        </div>
        <button>
          <img src={cartPlus} loading="lazy" alt="add-to-cart" />
        </button>
      </div>
    </li>
  )
}

export default Item