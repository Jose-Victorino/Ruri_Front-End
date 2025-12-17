import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobal, ACTIONS } from '@/context/GlobalContext';
import { wordCap } from '@/components/Util/Util.js'
import cn from 'classnames'

import s from './Category.module.scss'
import Item from './Item'

const SORT_BY_TYPES = ['Default', 'Popularity', 'latest', 'Average Rating', 'Price (low to high)', 'Price (high to low)']

function Category() {
  const { categoryName } = useParams()
  const { state, dispatch } = useGlobal()

  const products = state.PRODUCTS.filter((p) => p.categorySlug === categoryName);

  document.title = `RURI CLUB | ${wordCap(categoryName.replaceAll('-', ' '))}`
  
  const [currentSort, setCurrentSort] = useState('Default')

  return (
    <section className={s.category}>
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
          {products.filter((p) => p.isActive).map((p) =>
            <Item key={p.productId} {...p} />
          )}
        </ul>
      </div>
    </section>
  )
}

export default Category