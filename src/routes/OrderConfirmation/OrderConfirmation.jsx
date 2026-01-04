import React from 'react'

import s from './OrderConfirmation.module.scss'

function OrderConfirmation() {
  
  return (
    <div className='container pad-block-40'>
      <div className='flex gap-10 a-center'>
        
        <h3>Thank you for your order </h3>
      </div>
      <p>A confirmation email will be sent to you at </p>
    </div>
  )
}

export default OrderConfirmation