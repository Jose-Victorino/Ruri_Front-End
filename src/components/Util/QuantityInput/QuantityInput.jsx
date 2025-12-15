import { useRef } from 'react'

import s from './QuantityInput.module.scss'

import minusIcon from '@/assets/svg/minus.svg'
import plusIcon from '@/assets/svg/plus.svg'

function QuantityInput({state, setState, min, productID}) {
  const inputRef = useRef(null);
  
  const handleQuantityChange = (dir) => {
    const next = Math.max(min || 0, state + dir);
    setState(next);
    inputRef.current.value = next;
  }

  return (
    <div className={s.quantityInput}>
      <button onClick={() => handleQuantityChange(-1)}>
        <img src={minusIcon} loading="lazy" alt="minus" />
      </button>
      <div className={s.inputCont}>
        <input type="number" name={`quantity-${productID}`} ref={inputRef} min={min || 0} defaultValue={state} onChange={(e) => setState(parseInt(e.target.value))}/>
      </div>
      <button onClick={() => handleQuantityChange(1)}>
        <img src={plusIcon} loading="lazy" alt="plus" />
      </button>
    </div>
  )
}

export default QuantityInput