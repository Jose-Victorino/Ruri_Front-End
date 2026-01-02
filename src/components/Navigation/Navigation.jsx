import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'
import cn from 'classnames'

import s from './Navigation.module.scss'

import cartShopping from 'svg/cart-shopping.svg'
import magnifyingGlass from 'svg/magnifying-glass.svg'
import circleUser from 'svg/circle-user.svg'
import { toast } from 'react-toastify'

const burgerSVG = <svg xmlns="http://www.w3.org/2000/svg" fill='white' viewBox="0 0 448 512">
  <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
</svg>

const xMarkSVG = <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512">
  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
</svg>

const topNavLinks = [
  {
    txt: 'ABOUT',
    linkProps: {
      to: 'https://ruralrisingph.com'
    },
  },
  {
    txt: 'EVENTS',
    linkProps: {},
  },
  {
    txt: 'FAQs',
    linkProps: {
      to: '/faqs',
      className: ({isActive}) => cn({ [s.active] : isActive }),
    },
  },
]
const bottomNavLinks = [
  {
    txt: 'SHOP',
    linkProps: {
      to: '/',
      className: ({isActive}) => cn({ [s.active] : isActive }),
    }
  },
  {
    txt: 'MEMBERSHIP',
    linkProps: {
      to: '/membership',
      className: ({isActive}) => cn({ [s.active] : isActive }),
    }
  },
  {
    txt: 'TRACK ORDER',
    linkProps: {
      to: '/track-order',
      className: ({isActive}) => cn({ [s.active] : isActive }),
    }
  },
  {
    txt: 'STORE LOCATIONS',
    linkProps: {
      to: '/store-locations',
      className: ({isActive}) => cn({ [s.active] : isActive }),
    }
  },
]

function Navigation() {
  const { state, dispatch } = useGlobal()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const burgerRef = useRef(null)
  const closeBtnRef = useRef(null)

  const { user } = state.auth
  const itemsInCart = state.cart?.length || 0

  const closeMenu = () => {
    if (menuRef.current && menuRef.current.contains(document.activeElement)) {
      if (burgerRef.current) burgerRef.current.focus()
    }
    setMenuOpen(false)
  }

  const openMenu = () => setMenuOpen(true)

  useEffect(() => {
    if (!menuOpen) return
    if (closeBtnRef.current) closeBtnRef.current.focus()
  }, [menuOpen])

  const handleLogout = () => {
    dispatch({ type: ACTIONS.SET_AUTH_USER, payload: {} })
    toast.success('Logged Out Successfully')
  }

  const AuthNav = () => {
    return (
      <nav className={cn(s.authNav)}>
        {user.firstName ? (
          <button className={s.user} popoverTarget='user-options' id="user">
            <img src={circleUser} loading='lazy' alt="user" />
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </button>
        ) : (
          <div className='flex a-center gap-5'>
            <NavLink to='/auth/login' className={({isActive}) => cn({ [s.active] : isActive })}>
              Login
            </NavLink>{' / '}
            <NavLink to='/auth/sign-up' className={({isActive}) => cn({ [s.active] : isActive })}>
              Sign up
            </NavLink>
          </div>
        )}
        <div id='user-options' className={s.options} popover='auto' anchor="user">
          <ul className='flex-col'>
            <li>
              <button onClick={() => navigate('/user/profile')}>Profile</button>
            </li>
            <li>
              <button onClick={() => handleLogout()}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }

  return (
    <header className={s.header}>
      <section className={s.top}>
        <div className='container'>
          <nav>
            <ul className={cn(s.mainNav, s.navLinks)}>
              {topNavLinks.map((l) =>
                <li key={l.txt}>
                  <NavLink {...l.linkProps}>{l.txt}</NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div className='flex gap-30'>
            <AuthNav />
            <button className={s.cart} onClick={() => navigate('/cart')}>
              <img src={cartShopping} alt="cart" />
              <div>{itemsInCart}</div>
            </button>
          </div>
        </div>
      </section>
      <section className={s.bottom}>
        <div className='container'>
          <button ref={burgerRef} className={s.burger} onClick={openMenu}>
            {burgerSVG}
          </button>
          <div className={cn(s.logo, 'flex')}>
            <NavLink to='/'>
              <img src="/cropped-logo-600x203.png" loading="lazy" alt="logo" />
            </NavLink>
          </div>
          <nav>
            <ul className={cn(s.mainNav, s.navLinks)}>
              {bottomNavLinks.map((l) =>
                <li key={l.txt}>
                  <NavLink {...l.linkProps}>{l.txt}</NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div className={s.searchBar}>
            <input type="text" name='search' placeholder='Search...' autoComplete="false"/>
            <button>
              <img src={magnifyingGlass} loading="lazy" alt="search" />
            </button>
          </div>
        </div>
      </section>

      <div ref={menuRef} className={cn(s.mobileMenu, { [s.open]: menuOpen })} role="dialog" aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className={s.mobileInner}>
          <div className={cn(s.closeCont)}>
            <button ref={closeBtnRef} onClick={closeMenu}>{xMarkSVG}</button>
          </div>
          <div className={s.searchCont}>
            <div className={s.mobileSearch}>
              <input type="text" name='search' placeholder='Search...' autoComplete="false"/>
              <button>
                <img src={magnifyingGlass} loading="lazy" alt="search" />
              </button>
            </div>
          </div>
          <nav>
            <ul className={s.mobileNavLinks}>
              {[...bottomNavLinks, ...topNavLinks].map((l) =>
                <li key={l.txt}>
                  <NavLink {...l.linkProps} onClick={closeMenu}>{l.txt}</NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navigation