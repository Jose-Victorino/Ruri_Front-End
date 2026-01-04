import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useGlobal } from '@/context/GlobalContext'
import { useCart } from '@/hooks/useCart'
import cn from 'classnames'

import NotFound from '@/components/NotFound/NotFound'

import QuantityInput from '@/components/QuantityInput/QuantityInput'
import Rating from '@/components/Rating/Rating'
import { ScrollResetEffect } from '@/library/Util'

import s from './ProductDetails.module.scss'

import arrowLeft from 'svg/arrow-left.svg'
import arrowRight from 'svg/arrow-right.svg'
import checkIcon from 'svg/check.svg'
import mopAtome from '@/assets/mop/atome.svg'
import mopVisa from '@/assets/mop/visa-mastercard.png'
import mopGcash from '@/assets/mop/paymongo_gcash.png'
import mopGrab from '@/assets/mop/paymongo_grab_pay.png'
import mopMaya from '@/assets/mop/Maya_logo.png'
import mopBpi from '@/assets/mop/bpi.png'
import mopBillease from '@/assets/mop/billease.svg'
import ruriCoin from '@/assets/svg/ruri-coin.svg'

const REVIEW = [
  {
    id: 1,
    name: 'Lorem ipsum',
    date: '12-04-2025',
    rating: 2,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati atque fugit id sapiente a tempora magni sequi ad repellendus.',
  },
  {
    id: 2,
    name: 'Lorem ipsum',
    date: '12-04-2025',
    rating: 3,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati atque fugit id sapiente a tempora magni sequi ad repellendus.',
  },
  {
    id: 3,
    name: 'Lorem ipsum',
    date: '12-04-2025',
    rating: 4,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati atque fugit id sapiente a tempora magni sequi ad repellendus.',
  },
  {
    id: 4,
    name: 'Lorem ipsum',
    date: '12-04-2025',
    rating: 4,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati atque fugit id sapiente a tempora magni sequi ad repellendus.',
  },
  {
    id: 5,
    name: 'Lorem ipsum',
    date: '12-04-2025',
    rating: 2,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati atque fugit id sapiente a tempora magni sequi ad repellendus.',
  },
  {
    id: 6,
    name: 'Lorem ipsum',
    date: '12-04-2025',
    rating: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati atque fugit id sapiente a tempora magni sequi ad repellendus.',
  },
  {
    id: 7,
    name: 'Lorem ipsum',
    date: '12-04-2025',
    rating: 5,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati atque fugit id sapiente a tempora magni sequi ad repellendus.',
  },
  {
    id: 8,
    name: 'Lorem ipsum',
    date: '12-04-2025',
    rating: 1,
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati atque fugit id sapiente a tempora magni sequi ad repellendus.',
  },
]

const HtmlContentComponent = ({ htmlString }) => {
  return (htmlString !== '' && <div dangerouslySetInnerHTML={{ __html: htmlString }} />)
}

const UserRating = ({name, date, rating, review}) => (
  <li className={s.userRating}>
    <div className='flex-col gap-5'>
      <p>{name}</p>
      <Rating rate={rating}/>
      <span>{date}</span>
    </div>
    <p>{review}</p>
  </li>
)

function Product() {  
  const { state } = useGlobal()
  const { productName } = useParams()
  const { addToCart } = useCart()

  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [variantError, setVariantError] = useState('')
  const [quantityError, setQuantityError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const prodSlugs = state.PRODUCTS.reduce((prev, acc) => [...prev, acc.slug], [])
  
  if(!prodSlugs.includes(productName)) return <NotFound msg='Product Not Found'/>
  
  const product = state.PRODUCTS.find((p) => p.slug === productName)
  const { productId, name, category, description, variants } = product

  document.title = `${name} | RURI CLUB`

  const isOneVariant = variants.length === 1
  const parseDesc = description && description.split('\n ').map((d) => `<p>${d}</p>`).join('<br />')

  ScrollResetEffect()
  
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
  const ruriCoinVal = getRuriCoin();

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

  const reviewsPerPage = 5
  const totalPages = Math.ceil(REVIEW.length / reviewsPerPage)
  const startIndex = (currentPage - 1) * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const paginatedReviews = REVIEW.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum)
  }
  
  const handleAddToCart = () => {
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

    const success = addToCart(productId, variantId, quantity)
    if (success) {
      setQuantity(1)
      setSelectedVariant(null)
    }
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
            <img src='https://placehold.co/540' loading="lazy" alt={name} />
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
                        const isSelected = selectedVariant?.variantId === v.variantId
                        const isOutOfStock = v.stock < 1
                        
                        return (
                          <li key={v.variantId} className={cn({[s.notStocked]: isOutOfStock, [s.selected]: isSelected})} aria-selected={isSelected}>
                            <div className={s.checkMark} aria-hidden>
                              <img src={checkIcon} loading="lazy" alt="check" />
                            </div>
                            <button onClick={() => handleVariantState(v)} disabled={isOutOfStock} title={isOutOfStock ? 'Out of Stock' : ''}>{v.label}</button>
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
                )
              }
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
            {ruriCoinVal > 0 &&
              <div className={s.ruriCoin}>
                <span>Purchase this product now and earn</span> <img src={ruriCoin} loading='lazy' alt="ruri coin" /> <strong>{ruriCoinVal}</strong> <span>Ruri Coins!</span>
              </div>
            }
            <button className={s.addToCart} onClick={() => handleAddToCart()} disabled={!isCurrentlyStocked}>
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
        <div className="container">
          <h2>Reviews ({REVIEW.length || 0})</h2>
          <div>
            {REVIEW.length > 0 ? (
              <>
                <ul className={s.reviewList}>
                  {paginatedReviews.map((r) => <UserRating key={r.id} {...r}/>)}
                </ul>
                <div className={s.paginationCont}>
                  <button className={s.prevBtn} onClick={handlePrevPage} disabled={currentPage === 1}>
                    <img src={arrowLeft} loading='lazy' alt="previous" />
                  </button>
                  <ul className={s.reviewPagination}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <li key={pageNum}>
                        <button 
                          className={currentPage === pageNum ? s.currentPage : ''}
                          onClick={() => handlePageClick(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className={s.nextBtn} onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <img src={arrowRight} loading='lazy' alt="next" />
                  </button>
                </div>
              </>
            ) : (
              <p className='pad-block-20'>There are not reviews yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
export default Product