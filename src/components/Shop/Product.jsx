import { useState, useRef } from 'react'
import { useParams, NavLink, Link, Routes, Route, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import s from './Product.module.scss'

const ITEM = {
  category: 'CSA Boxes',
  name: 'Furry Friends Box',
  variants: [
    {
      name: 'Daily Bowl (10kg)',
      price: 799,
      stock: 3,
    },
    {
      name: 'Shelter Pack (30kg)',
      price: 1999,
      stock: 10,
    },
  ]
}

function Product() {
  document.title = `${ITEM.name} | RURI CLUB`
  
  const [selectedVariant, setSelectedVariant] = useState(null)
  const quantityRef = useRef(null)

  const handleQuantityChange = (dir) => {
    const current = parseInt(quantityRef.current?.value, 10) || 0;
    const next = Math.max(0, current + dir);
    quantityRef.current.value = next;
  }

  return (
    <div className='flex-col gap-20 pad-block-20'>
      <section className={s.breadcrumbs}>
        <div className="container">
          <NavLink to='/'>Home</NavLink>
          <span className={s.divider}>/</span>
          <NavLink to={`/category/${ITEM.category.toLowerCase().replaceAll(' ', '-')}`}>{ITEM.category}</NavLink>
          <span className={s.divider}>/</span>
          <strong>{ITEM.name}</strong>
        </div>
      </section>
      <section className={s.product}>
        <div className="container">
          <div className={s.left}>
            <img src="/src/assets/461087521_843841854602360_6475783316939153006_n.png" loading="lazy" alt="product" />
          </div>
          <div className={s.right}>
            <h1>Furry Friends Box</h1>
            <div className={s.priceCont}>
              <p className={s.price}>₱799 - ₱1999</p>
            </div>
            <div className={s.grid}>
              <h4>Variants</h4>
              <ul className={s.variantList}>
                {ITEM.variants.map(({name, stock}) => {
                  const isSelected = selectedVariant === name;
                  return (
                    <li key={name} className={cn({[s.selected]: isSelected})} aria-selected={isSelected}>
                      <div className={s.checkMark} aria-hidden>
                        <img src="/src/assets/svg/check.svg" loading="lazy" alt="check" />
                      </div>
                      <button onClick={() => setSelectedVariant(name)}>{name}</button>
                    </li>
                  )
                })}
              </ul>

              <h4>Delivery</h4>
              <p>via Lalamove (₱250 base delivery fee)</p>
              
              <h4>Quantity</h4>
              <div className='flex-col gap-10'>
                <div className={s.quantityInput}>
                  <button onClick={() => handleQuantityChange(-1)}>
                    <img src="/src/assets/svg/minus.svg" loading="lazy" alt="minus" />
                  </button>
                  <div className={s.inputCont}>
                    <input type="number" name='quantity' ref={quantityRef} min={0} defaultValue={0} />
                  </div>
                  <button onClick={() => handleQuantityChange(1)}>
                    <img src="/src/assets/svg/plus.svg" loading="lazy" alt="plus" />
                  </button>
                </div>
                <span>100 in stock</span>
              </div>
            </div>
            <button className={s.addToCart}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Add To Cart</span>
            </button>
            <div className={s.mop}>
              <figure>
                <img src="/src/assets/mop/atome.svg" loading="lazy" alt="atome" />
              </figure>
              <figure>
                <img src="/src/assets/mop/visa-mastercard.png" loading="lazy" alt="visa" />
              </figure>
              <figure>
                <img src="/src/assets/mop/paymongo_gcash.png" loading="lazy" alt="gcash" />
              </figure>
              <figure>
                <img src="/src/assets/mop/paymongo_grab_pay.png" loading="lazy" alt="grab pay" />
              </figure>
              <figure>
                <img src="/src/assets/mop/Maya_logo.png" loading="lazy" alt="maya" />
              </figure>
              <figure>
                <img src="/src/assets/mop/bpi.png" loading="lazy" alt="bpi" />
              </figure>
              <figure>
                <img src="/src/assets/mop/billease.svg" loading="lazy" alt="billease" />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className={s.additionalInformation}>
        <div className="container flex-col gap-15">
          <h2>Additional Information</h2>
          <div>
            <p>Give your pets a healthy, balanced diet with the Farm-to-Feeding Bowl Box, filled with farm-fresh ingredients perfect for home-prepared meals. Each box may include a variety of fresh and frozen vegetables, providing long-lasting nutrients that can be easily stored and used as needed. As a future plan, we aim to introduce natural treats to further enhance your pet's diet.</p>
            <br />
            <b>Available Options:</b>
            <ul>
              <li>Daily Bowl: P799 for 10 kilos</li>
              <li>Shelter Pack: P1999 for 30 kilos</li>
            </ul>
            <br />
            <p>This box ensures your pets receive quality, farm-sourced nutrition, while also helping rescue shelters nourish animals in need.</p>
          </div>
          <h3>Where's My Order?</h3>
          <p>Most of our produce has a tentative dispatch date. We encourage you to check our latest Viber announcements for updates on your order status. With our new delivery service feature, we strive to send your orders as soon as they become available.</p>
        </div>
      </section>
      <section className={s.reviews}>
        <div className="container flex-col gap-15">
          <h2>Reviews (0)</h2>
          <div>
            <p>There are not reviews yet.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Product