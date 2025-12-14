import React from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import s from './Tier.module.scss'

function Tier({name, desc}) {
  const navigate = useNavigate();

  return (
    <li className={cn(s.tier, s[`tier-${name}`])}>
      <div className={s.top}>
        <img src={`/src/assets/svg/tier-${name}.svg`} loading='lazy' alt={name} />
        <h3>{name}</h3>
      </div>
      <p>{desc}</p>
      <button
        onClick={() => navigate({
          pathname: '/auth/sign-up',
          search: `membership=${name}`
        })}
      >
        Join Now
      </button>
    </li>
  )
}

export default Tier