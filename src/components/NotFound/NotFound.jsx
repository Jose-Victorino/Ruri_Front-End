import React from 'react'

import s from './NotFound.module.scss'

function NotFound({ msg }) {

  return (
    <section>
      <div className='container pad-block-50'>
        <h3>{msg}</h3>
      </div>
    </section>
  )
}

export default NotFound