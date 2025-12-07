import { useState } from 'react'
import { Outlet } from 'react-router'

import Navigation from '/src/components/Navigation/Navigation'

import './App.module.scss'

function App() {

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default App
