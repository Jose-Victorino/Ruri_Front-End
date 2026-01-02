import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import { wordCap, ScrollResetEffect } from '@/library/Util'
import cn from 'classnames'

import ProductCard from './ProductCard'

import s from './Category.module.scss'

import arrowLeft from 'svg/arrow-left.svg'
import arrowRight from 'svg/arrow-right.svg'

const SORT_BY_TYPES = ['Default', 'Popularity', 'latest', 'Average Rating', 'Price (low to high)', 'Price (high to low)']

function Category() {
  const { categoryName } = useParams()
  const { state, dispatch } = useGlobal()

  const products = state.PRODUCTS.filter((p) => p.categorySlug === categoryName)

  document.title = `RURI CLUB | ${wordCap(categoryName.replaceAll('-', ' '))}`
  
  const [currentSort, setCurrentSort] = useState('Default')
  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 20
  const activeProducts = products.filter((p) => p.isActive)
  const totalPages = Math.ceil(activeProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const paginatedProducts = activeProducts.slice(startIndex, endIndex)

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

  ScrollResetEffect()

  return (
    <section className={s.category}>
      {products?.length ?
        <div className='container flex-col gap-20'>
          <h3>{products.length} products found</h3>
          <div className={s.header}>
            <span>Sort by</span>
            <ul className={s.sortList}>
              {SORT_BY_TYPES.map((sortName) =>
                <li key={sortName}>
                  <button className={cn({[s.selected]: currentSort === sortName})} onClick={() => setCurrentSort(sortName)}>{sortName}</button>
                </li>
              )}
            </ul>
            <select className={s.sortSelect} name="sortBy" value={currentSort} onChange={(e) => setCurrentSort(e.target.value)}>
              {SORT_BY_TYPES.map((sortName) =>
                <option key={sortName} value={sortName}>{sortName}</option>
              )}
            </select>
          </div>
          <ul className={s.productList}>
            {paginatedProducts.map((p) =>
              <ProductCard key={p.productId} {...p} />
            )}
          </ul>
          {totalPages > 1 && (
            <div className={s.paginationCont}>
              <button className={s.prevBtn} onClick={handlePrevPage} disabled={currentPage === 1}>
                <img src={arrowLeft} loading='lazy' alt="previous" />
              </button>
              <ul className={s.productPagination}>
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
          )}
        </div>
        : <div className={cn('container', s.nullHeader)}>
          <span>There are not products available in this category</span>
        </div>
      }
    </section>
  )
}

export default Category