import { useRef } from 'react'

import s from './QuantityInput.module.scss'

import minusIcon from 'svg/minus.svg'
import plusIcon from 'svg/plus.svg'

function QuantityInput({state, setState, min, productID, disabled = false}) {
  const inputRef = useRef(null);
  
  const handleQuantityChange = (dir) => {
    const next = Math.max(min || 0, state + dir);
    setState(next);
    inputRef.current.value = next;
  }

  return (
    <div className={s.quantityInput}>
      <button onClick={() => handleQuantityChange(-1)} disabled={disabled}>
        <img src={minusIcon} loading="lazy" alt="minus" />
      </button>
      <div className={s.inputCont}>
        <input
          ref={inputRef}
          type="number"
          name={`quantity-${productID}`}
          min={min || 0}
          defaultValue={state}
          onChange={(e) => setState(parseInt(e.target.value))}
          disabled={disabled}
        />
      </div>
      <button onClick={() => handleQuantityChange(1)} disabled={disabled}>
        <img src={plusIcon} loading="lazy" alt="plus" />
      </button>
    </div>
  )
}

export default QuantityInput