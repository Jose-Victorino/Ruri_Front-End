import React from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'

import Item from './Item'

import s from './Home.module.scss'
import banner2 from '@/assets/banner-2.png'

const CATEGORIES = ['CSA Boxes', 'Fruits', 'Rescue Buy', 'Exclusives', 'Wholesale']

function Shop() {
  const navigate = useNavigate();
  document.title = "RURI CLUB"
  
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
          <h2>Categories</h2>
          <ul className={s.categoryList} aria-label="Category List">
            {CATEGORIES.map((category) =>
              <li key={category} role="button" onClick={() => navigate(`category/${category.toLowerCase().replaceAll(' ', '-')}`)}>
                {category}
              </li>
            )}
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
          <img src={banner2} loading="lazy" alt="banner" />
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