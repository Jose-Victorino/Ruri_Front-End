import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import Navigation from '@/components/Navigation/Navigation'

import './App.module.scss'
import Footer from '@/components/Footer/Footer'

function App() {
  const location = useLocation()

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.scrollTo) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
      if (document && document.documentElement) document.documentElement.scrollTop = 0
      if (document && document.body) document.body.scrollTop = 0

      // if your app uses a scrolling container other than window, reset it too
      const container = document.querySelector('.container')
      if (container && container.scrollTop) container.scrollTop = 0
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [location.pathname, location.search, location.hash, location.key])

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
