import React from 'react'
import { useParams, NavLink, Routes, Route, useNavigate } from 'react-router-dom'

import s from './Shop.module.scss'

function Shop() {
  return (
    <>
      <section className={s.hero}>
        <div className='container'>
          <div className={s.text}>
            <h2>An initiative from <b>Rural Rising Philippines</b></h2>
            <h1>Let's grow the future together!</h1>
            <p>A thriving community connecting you with the heart of Filipino farming – fresh, sustainable produce, and unwavering support for those who nourish our nation.</p>
            <div>
              <b>Enjoy up to 20% off on all products.</b>
              <button>
                <NavLink to='/membership'>Join Now</NavLink>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          
        </div>
      </section>
      <section>
        <div className='container'>
          
        </div>
      </section>
      <section>
        <div className='container'>
          
        </div>
      </section>
    </>
  )
}

export default Shop