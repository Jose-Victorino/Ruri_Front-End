import { useState } from 'react'
import { useParams, NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import s from './Category.module.scss'
import Item from './Item'

const SORT_BY_TYPES = ['Default', 'Popularity', 'latest', 'Average Rating', 'Price (low to high)', 'Price (high to low)']

function Category() {
  const [currentSort, setCurrentSort] = useState('Default')
  

  return (
    <section className={s.category}>
      <div className='container'>
        <h3 className='mb-20'>1 product(s) found</h3>
        <div className={cn(s.header, 'mb-20')}>
          <span>Sort by</span>
          <ul>
            {SORT_BY_TYPES.map((sortName) =>
              <li key={sortName}>
                <button className={cn({[s.selected]: currentSort === sortName})} onClick={() => setCurrentSort(sortName)}>{sortName}</button>
              </li>
            )}
          </ul>
        </div>
        <ul className={s.productList}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </ul>
      </div>
    </section>
  )
}

          // <select>
          //   {SORT_BY_TYPES.map((sortName) =>
          //     <option key={sortName}>{sortName}</option>
          //   )}
          // </select>
export default Category