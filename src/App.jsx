import { useState } from 'react'
import { Outlet } from 'react-router'

import Navigation from '/src/components/navigation/navigation'

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
