import React from 'react'
import { useParams, NavLink, Routes, Route, useNavigate } from 'react-router-dom'

import s from './Shop.module.scss'
import Item from './Item'

function Shop() {
  return (
    <>
      <section className={s.hero}>
        <div className='container'>
          <div className={s.text}>
            <h2>An initiative from <b>Rural Rising Philippines</b></h2>
            <h1>Let's grow the future together!</h1>
            <p>A thriving community connecting you with the heart of Filipino farming - fresh, sustainable produce, and unwavering support for those who nourish our nation.</p>
            <div>
              <b>Enjoy up to 20% off on all products.</b>
              <button>
                <NavLink to='/membership'>Join Now</NavLink>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={s.categories}>
        <div className='container flex-col gap-30'>
          <div className='flex-col gap-10'>
            <h2>Categories</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sequi impedit dolorem nemo. Quod, quia?</p>
          </div>
          <ul className={s.categoryList}>
            <li>CSA Boxes</li>
            <li>Fruits</li>
            <li>Rescue Buy</li>
            <li>Exclusives</li>
            <li>Wholesale</li>
          </ul>
        </div>
      </section>
      <section className={s.shop}>
        <div className='container'>
          <ul>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </ul>
        </div>
      </section>
      <section className={s.footer}>
        <div className='container'>
          <img src="" alt="asd" />
          <div>
            <h2><span>Together,</span> we can achieve our vision.</h2>
            <p>Real change doesn't come from big, dramatic efforts. It grows quietly through small acts of kindness, a sense of duty, and a commitment to something greater than ourselves. It's about being aware, caring, and choosing to take action when it matters. By joining Ruri Club, you're part of a community working towards a future where fairness and sustainability aren't just ideals — they're realities we build together, step by step.</p>
            <button>
              <NavLink to='/membership'>Join Now</NavLink>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop