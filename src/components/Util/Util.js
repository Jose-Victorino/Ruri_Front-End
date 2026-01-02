import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function wordCap(str) {
  str = str.toLowerCase()

  const words = str.split(' ')

  const capitalizedWords = words.map(word =>
    (word.length > 0) ? word.charAt(0).toUpperCase() + word.slice(1) : ''
  )

  return capitalizedWords.join(' ')
}

function ScrollReset(){
  try {
    if(typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
    if(document){
      if(document.documentElement) document.documentElement.scrollTop = 0
      if(document.body) document.body.scrollTop = 0
    }

    const container = document.querySelector('.container')
    if(container && container.scrollTop) container.scrollTop = 0
  } catch(e){}
}

export function ScrollResetEffect(){
  const location = useLocation()

  useEffect(ScrollReset, [location.pathname])
}

export { ScrollReset }