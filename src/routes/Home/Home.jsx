import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobal } from '@/context/GlobalContext'

import ProductCard from '@/features/Product/ProductCard'
import Button from '@/components/Button/Button'

import s from './Home.module.scss'

import banner2 from '@/assets/banner-2.png'

function Shop() {
  const navigate = useNavigate()
  const { state } = useGlobal()
  const { PRODUCTS, CATEGORIES } = state
  
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
              <Button
                text='Join Now'
                color='yellow'
                corners='rounded'
                onClick={() => navigate('/membership')}
              />
            </div>
          </div>
        </div>
      </section>
      <section className={s.categories}>
        <div className='container flex-col gap-30'>
          <h2>Categories</h2>
          <ul className={s.categoryList} aria-label="Category List">
            {CATEGORIES.map((c) =>
              <li
                key={c.categoryId}
                role="button"
                onClick={() => navigate(`category/${c.name.toLowerCase().replaceAll(' ', '-')}`)}
              >
                {c.name}
              </li>
            )}
          </ul>
        </div>
      </section>
      <section className={s.shop}>
        <div className='container'>
          <ul>
            {PRODUCTS.filter((p) => p.isActive).map((p) =>
              <ProductCard key={p.productId} {...p} />
            )}
          </ul>
        </div>
      </section>
      <section className={s.footer}>
        <div className='container'>
          <img src={banner2} loading="lazy" alt="banner" />
          <div>
            <h2><span>Together,</span> we can achieve our vision.</h2>
            <p>Real change doesn't come from big, dramatic efforts. It grows quietly through small acts of kindness, a sense of duty, and a commitment to something greater than ourselves. It's about being aware, caring, and choosing to take action when it matters. By joining Ruri Club, you're part of a community working towards a future where fairness and sustainability aren't just ideals — they're realities we build together, step by step.</p>
            <Button
              text='Join Now'
              color='yellow'
              corners='rounded'
              onClick={() => navigate('/membership')}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop