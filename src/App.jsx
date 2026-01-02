import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Navigation from '@/components/Navigation/Navigation'

import './App.module.scss'
import Footer from '@/components/Footer/Footer'

function App() {

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
