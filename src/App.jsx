import React from 'react'
import { Outlet } from 'react-router'

import Navigation from '@/components/Navigation/Navigation'
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
