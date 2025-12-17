import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useGlobal, ACTIONS } from '@/context/GlobalContext';
import cn from 'classnames'

import QuantityInput from '@/components/Util/QuantityInput/QuantityInput'

import s from './Product.module.scss'

import productImage from '@/assets/461087521_843841854602360_6475783316939153006_n.png'
import checkIcon from 'svg/check.svg'
import mopAtome from '@/assets/mop/atome.svg'
import mopVisa from '@/assets/mop/visa-mastercard.png'
import mopGcash from '@/assets/mop/paymongo_gcash.png'
import mopGrab from '@/assets/mop/paymongo_grab_pay.png'
import mopMaya from '@/assets/mop/Maya_logo.png'
import mopBpi from '@/assets/mop/bpi.png'
import mopBillease from '@/assets/mop/billease.svg'
import ruriCoin from '@/assets/svg/ruri-coin.svg'

const HtmlContentComponent = ({ htmlString }) => {
  return (htmlString !== '' && <div dangerouslySetInnerHTML={{ __html: htmlString }} />);
};

function Product() {  
  const { state, dispatch } = useGlobal()
  const { productName } = useParams()

  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [variantError, setVariantError] = useState('')
  const [quantityError, setQuantityError] = useState('')

  const product = state.PRODUCTS.find((p) => p.slug === productName)
  const { productId, name, category, description, variants } = product;

  document.title = `${name} | RURI CLUB`

  const isOneVariant = variants.length === 1
  const parseDesc = description && description.split('\n ').map((d) => `<p>${d}</p>`).join('<br />')
  
  if(isOneVariant && selectedVariant === null) {
    setSelectedVariant(variants[0])
  }
  
  const getPrice = () => {
    if(isOneVariant)
      return `₱${variants[0].price.toLocaleString()}`

    if(selectedVariant)
      return `₱${selectedVariant.price.toLocaleString()}`
    
    const prices = variants.map(v => v.price)
    const minPrice = Math.min(...prices).toLocaleString()
    const maxPrice = Math.max(...prices).toLocaleString()

    return `₱${minPrice} - ₱${maxPrice}`
  }

  const getRuriCoin = () => {
    if (selectedVariant) {
      const variant = variants.find(v => v.variantId === selectedVariant.variantId)
      return variant?.ruriCoin || 0
    }
    return Math.max(...variants.map(v => v.ruriCoin))
  }

  const getStock = () => {
    if (selectedVariant) {
      const variant = variants.find(v => v.variantId === selectedVariant.variantId)
      return variant?.stock || 0
    }
    return variants.reduce((acc, v) => acc + v.stock, 0)
  }

  const currentStock = getStock()
  const isCurrentlyStocked = currentStock > 0
  
  const handleVariantState = (variant) => {
    setSelectedVariant(variant)
    setVariantError('')
  }
  
  const addToCart = () => {
    if (!isOneVariant && !selectedVariant) {
      setVariantError('Please select a variant')
      return
    }

    if (quantity < 1) {
      setQuantityError('Quantity must be at least 1')
      return
    }

    const variantId = isOneVariant ? variants[0].variantId : selectedVariant.variantId
    const variant = variants.find(v => v.variantId === variantId)

    if (quantity > variant.stock && !variant.unlimitedStock) {
      setQuantityError(`Only ${variant.stock} in stock`)
      return
    }

    const cartItem = {
      productId,
      variantId,
      quantity
    }

    const existingCartIndex = state.cart.findIndex(
      item => item.productId === productId && item.variantId === variantId
    )

    let updatedCart
    if (existingCartIndex > -1) {
      updatedCart = [...state.cart]
      updatedCart[existingCartIndex].quantity += quantity
    } else {
      updatedCart = [...state.cart, cartItem]
    }

    dispatch({ type: ACTIONS.ADD_TO_CART, payload: updatedCart })
  }

  return (
    <div className='flex-col gap-20 pad-block-20'>
      <section className={s.breadcrumbs}>
        <div className="container">
          <NavLink to='/'>Home</NavLink>
          <span className={s.divider}>/</span>
          <NavLink to={`/category/${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</NavLink>
          <span className={s.divider}>/</span>
          <strong>{name}</strong>
        </div>
      </section>
      <section className={s.product}>
        <div className="container">
          <div className={s.left}>
            <img src={productImage} loading="lazy" alt="product" />
          </div>
          <div className={s.right}>
            <h1>{name}</h1>
            <div className={s.priceCont}>
              <p className={s.price}>{getPrice()}</p>
            </div>
            <div className={s.grid}>
              {!isOneVariant && 
                <div>
                  <h4>Variants</h4>
                  <div className='flex-col gap-5'>
                    <ul className={s.variantList}>
                      {variants.map((v) => {
                        const isSelected = selectedVariant?.variantId === v.variantId;
                        return (
                          <li key={v.variantId} className={cn({[s.selected]: isSelected})} aria-selected={isSelected}>
                            <div className={s.checkMark} aria-hidden>
                              <img src={checkIcon} loading="lazy" alt="check" />
                            </div>
                            <button onClick={() => handleVariantState(v)}>{v.label}</button>
                          </li>
                        )
                      })}
                    </ul>
                    {variantError && <span className={s.error}>{variantError}</span>}
                  </div>
                </div>
              }
              {selectedVariant?.additionalInfo &&
                Object.entries(selectedVariant.additionalInfo).map(([key, val]) =>
                <div key={key}>
                  <div>
                    <h4>{key}</h4>
                  </div>
                  <p>{val}</p>
                </div>
              )}
              <div>
                <h4>Delivery</h4>
                <div>
                  <p>via Lalamove (₱250 base delivery fee)</p>
                </div>
              </div>
              <div>
                <h4>Quantity</h4>
                <div className='flex-col gap-10'>
                  <div className='flex-wrap gap-15 a-center'>
                    <QuantityInput
                      state={quantity}
                      min={1}
                      setState={(next) => { setQuantity(next); setQuantityError('') }}
                      productID={name}
                      disabled={!isCurrentlyStocked}
                    />
                    {isCurrentlyStocked ? (
                      <span>{currentStock} in stock</span>
                    ) : (
                      <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Out of stock</span>
                    )}
                  </div>
                  {quantityError && <span className={s.error}>{quantityError}</span>}
                </div>
              </div>
            </div>
            {getRuriCoin() > 0 &&
              <div className={s.ruriCoin}>
                <span>Purchase this product now and earn</span> <img src={ruriCoin} loading='lazy' alt="ruri coin" /> <strong>{getRuriCoin()}</strong> <span>Ruri Coins!</span>
              </div>
            }
            <button className={s.addToCart} onClick={() => addToCart()} disabled={!isCurrentlyStocked}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{isCurrentlyStocked ? 'Add To Cart' : 'Out of Stock'}</span>
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
      <section className={s.additionalInfo}>
        <div className="container flex-col gap-15">
          <h2>More Information</h2>
          <HtmlContentComponent htmlString={parseDesc} />
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