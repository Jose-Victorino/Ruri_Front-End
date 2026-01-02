import { createContext, useContext, useReducer, useEffect } from 'react'
import { initialState } from './initialState'

const GlobalContext = createContext()

const ACTIONS = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  ADD_USER: 'ADD_USER',
  SET_CART: 'SET_CART',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_ITEM_QTY: 'UPDATE_ITEM_QTY',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',

  SET_CHECKOUT_INFORMATION: 'SET_CHECKOUT_INFORMATION',
  UPDATE_CHECKOUT_INFORMATION: 'UPDATE_CHECKOUT_INFORMATION',
}

function reducer(state, action) {
  const {type, payload} = action

  switch (type) {
    case ACTIONS.SET_AUTH_USER:
      return { ...state, auth: { user: payload || {} } }
    case ACTIONS.ADD_USER:
      return { ...state, USERS: [...state.USERS, payload] }
    case ACTIONS.SET_CART:
      return { ...state, cart: payload || [] }
    case ACTIONS.ADD_TO_CART:
      return { ...state, cart: payload || [] }
    case ACTIONS.UPDATE_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.productId === payload.productId && item.variantId === payload.variantId
            ? { ...item, quantity: payload.quantity }
            : item
        )
      }
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          item => !(item.productId === payload.productId && item.variantId === payload.variantId)
        )
      }
    case ACTIONS.SET_CHECKOUT_INFORMATION:
      return { ...state, checkoutInformation: payload || {} }
    case ACTIONS.UPDATE_CHECKOUT_INFORMATION:
      return { ...state,
        checkoutInformation: {
          ...state.checkoutInformation,
          [payload.name]: payload.value,
        }
      }
    default:
      return state
  }
}

function useGlobal() {
  return useContext(GlobalContext)
}

function setLocalStorage(key, value, fallback){
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value || fallback))
    } catch(e) {}
  }, [value])
}

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    try {
      const cart = localStorage.getItem('ruri_cart')
      if(cart)
        dispatch({
          type: ACTIONS.SET_CART,
          payload: JSON.parse(cart)
        })

      const checkoutInfo = localStorage.getItem('ruri_checkout_information')
      if(checkoutInfo)
        dispatch({
          type: ACTIONS.SET_CHECKOUT_INFORMATION,
          payload: {
            ...JSON.parse(checkoutInfo),
            country: 'Philippines',
            region: 'Metro Manila',
            termsAndConditions: false,
          }
        })
    } catch (e) {}
  }, [])

  setLocalStorage('ruri_cart', state.cart, [])
  setLocalStorage('ruri_checkout_information', state.checkoutInformation, {})

  return (
    <GlobalContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </GlobalContext.Provider>
  )
}

export {reducer, useGlobal, GlobalProvider, ACTIONS}