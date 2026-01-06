import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGlobal } from '@/context/GlobalContext'
import { ScrollResetEffect } from '@/library/Util'
import cn from 'classnames'

import ProductCard from '@/features/Product/ProductCard'

import s from './searchResults.module.scss'

import arrowLeft from 'svg/arrow-left.svg'
import arrowRight from 'svg/arrow-right.svg'

const SORT_BY_TYPES = ['Default', 'Popularity', 'latest', 'Average Rating', 'Price (low to high)', 'Price (high to low)']

function SearchResults() {
  const [searchParams] = useSearchParams()
  const { state } = useGlobal()

  const searchQuery = searchParams.get('s')
  const products = state.PRODUCTS.filter((p) => p.categorySlug === 'csa-boxes')

  document.title = `RURI CLUB | ${searchQuery}`
  
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
    <section className={s.searchResults}>
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
          <span>Not products found</span>
        </div>
      }
    </section>
  )
}

export default SearchResults