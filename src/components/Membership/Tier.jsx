import React from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

import s from './Tier.module.scss'

import tierSeed from 'svg/tier-seed.svg'
import tierTree from 'svg/tier-tree.svg'
import tierForest from 'svg/tier-forest.svg'

const TIER_ICONS = {
  seed: tierSeed,
  tree: tierTree,
  forest: tierForest,
}

function Tier({name, desc}) {
  const navigate = useNavigate();

  return (
    <li className={cn(s.tier, s[`tier-${name}`])}>
      <div className={s.top}>
        <img src={TIER_ICONS[name]} loading='lazy' alt={name} />
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