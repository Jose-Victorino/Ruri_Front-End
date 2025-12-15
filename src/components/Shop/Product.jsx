import { useState } from 'react'
import { useParams, NavLink, Link, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import QuantityInput from '@/components/Util/QuantityInput/QuantityInput'
import { useGlobal, ACTIONS } from '@/context/GlobalContext';

import s from './Product.module.scss'

import productImage from '@/assets/461087521_843841854602360_6475783316939153006_n.png'
import checkIcon from '@/assets/svg/check.svg'
import mopAtome from '@/assets/mop/atome.svg'
import mopVisa from '@/assets/mop/visa-mastercard.png'
import mopGcash from '@/assets/mop/paymongo_gcash.png'
import mopGrab from '@/assets/mop/paymongo_grab_pay.png'
import mopMaya from '@/assets/mop/Maya_logo.png'
import mopBpi from '@/assets/mop/bpi.png'
import mopBillease from '@/assets/mop/billease.svg'

const ITEM = {
  name: 'Furry Friends Box',
  category: 'CSA Boxes',
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

// const ITEM = {
//   name: 'Adlai',
//   category: 'Rescue Buy',
//   price: 499,
//   stock: 17,
// }

function Product() {
  document.title = `${ITEM.name} | RURI CLUB`
  
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { state, dispatch } = useGlobal();
  const [variantError, setVariantError] = useState('')
  const [quantityError, setQuantityError] = useState('')
  
  const hasVariants = Array.isArray(ITEM.variants) && ITEM.variants.length > 0
  const prices = hasVariants ? ITEM.variants.map(v => v.price) : []
  const minPrice = hasVariants ? Math.min(...prices) : ITEM.price || 0
  const maxPrice = hasVariants ? Math.max(...prices) : ITEM.price || 0

  const selectedVariantObj = hasVariants ? ITEM.variants.find(v => v.name === selectedVariant) || null : null
  const priceDisplay = hasVariants 
    ? (selectedVariantObj
        ? `₱${selectedVariantObj.price}`
        : (minPrice === maxPrice ? `₱${minPrice.toLocaleString()}` : `₱${minPrice.toLocaleString()} - ₱${maxPrice.toLocaleString()}`)
      )
    : `₱${minPrice.toLocaleString()}`
  const totalStock = hasVariants ? ITEM.variants.reduce((acc, v) => acc + (v.stock || 0), 0) : (ITEM.stock || 0)
  const stockDisplay = `${hasVariants && selectedVariantObj ? selectedVariantObj.stock : totalStock} in stock`

  const addToCart = () => {
    if (hasVariants) {
      if (!selectedVariant) {
        setVariantError('Please select a variant.')
        return;
      }
    }

    if (!quantity || Number(quantity) < 1) {
      setQuantityError('Must add at least 1.')
      return;
    }

    const variantObj = selectedVariantObj;
    const qty = Number(quantity);
    const availableStock = hasVariants ? (variantObj ? variantObj.stock : 0) : (ITEM.stock || 0)

    if (qty > availableStock) {
      setQuantityError(`Only ${availableStock} items in stock for this item.`)
      return;
    }

    try {
      const key = 'ruri_cart';
      const raw = localStorage.getItem(key);
      const cart = raw ? JSON.parse(raw) : [];

      const idx = cart.findIndex(it => {
        if (hasVariants) return it.name === ITEM.name && it.variant?.name === variantObj?.name
        return it.name === ITEM.name
      });
      if (idx > -1) {
        const existing = cart[idx];
        const cap = hasVariants ? variantObj.stock : (ITEM.stock || Infinity)
        const newQty = Math.min((Number(existing.quantity) || 0) + qty, cap);
        cart[idx] = { ...existing, quantity: newQty };
      } else {
        cart.push({
          name: ITEM.name,
          category: ITEM.category,
          quantity: qty,
          ...(hasVariants ? {
            variant: { ...variantObj } 
          } : {
            price: ITEM.price,
            stock: ITEM.stock,
          }),
        });
      }

      localStorage.setItem(key, JSON.stringify(cart));
      dispatch({ type: ACTIONS.SET_CART, payload: cart });
      alert('Added to cart');
    } catch (e) {
      console.error(e);
      alert('Could not add to cart.');
    }
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
            <img src={productImage} loading="lazy" alt="product" />
          </div>
          <div className={s.right}>
            <h1>Furry Friends Box</h1>
            <div className={s.priceCont}>
              <p className={s.price}>{priceDisplay}</p>
            </div>
            <div className={s.grid}>
              {hasVariants && (
                <>
                  <h4>Variants</h4>
                  <div className='flex-col gap-5'>
                    <ul className={s.variantList}>
                      {ITEM.variants.map(({name, stock}) => {
                          const isSelected = selectedVariant === name;
                          return (
                            <li key={name} className={cn({[s.selected]: isSelected})} aria-selected={isSelected}>
                              <div className={s.checkMark} aria-hidden>
                                <img src={checkIcon} loading="lazy" alt="check" />
                              </div>
                              <button onClick={() => { setSelectedVariant(name); setVariantError('') }}>{name}</button>
                            </li>
                          )
                        })}
                    </ul>
                    {variantError && <span className={s.error}>{variantError}</span>}
                  </div>
                </>
              )}

              <h4>Delivery</h4>
              <div>
                <p>via Lalamove (₱250 base delivery fee)</p>
              </div>
              
              <h4>Quantity</h4>
              <div className='flex-col gap-10'>
                <div className='flex-wrap gap-15 a-center'>
                  <QuantityInput
                    state={quantity}
                    min={1}
                    setState={(next) => { setQuantity(next); setQuantityError('') }}
                    productID={ITEM.name}
                  />
                  <span>{stockDisplay}</span>
                </div>
                {quantityError && <span className={s.error}>{quantityError}</span>}
              </div>
            </div>
            <button className={s.addToCart} onClick={() => addToCart()}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Add To Cart</span>
            </button>
            <div className={s.mop}>
              <figure>
                <img src={mopAtome} loading="lazy" alt="atome" />
              </figure>
              <figure>
                <img src={mopVisa} loading="lazy" alt="visa" />
              </figure>
              <figure>
                <img src={mopGcash} loading="lazy" alt="gcash" />
              </figure>
              <figure>
                <img src={mopGrab} loading="lazy" alt="grab pay" />
              </figure>
              <figure>
                <img src={mopMaya} loading="lazy" alt="maya" />
              </figure>
              <figure>
                <img src={mopBpi} loading="lazy" alt="bpi" />
              </figure>
              <figure>
                <img src={mopBillease} loading="lazy" alt="billease" />
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