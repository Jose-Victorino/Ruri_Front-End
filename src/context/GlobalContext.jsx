import { createContext, useContext, useReducer, useEffect } from 'react'
import { initialState } from './initialState'

const GlobalContext = createContext()

const ACTIONS = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  ADD_USER: 'ADD_USER',
  UPDATE_USER_PASSWORD: 'UPDATE_USER_PASSWORD',
  SET_CART: 'SET_CART',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_ITEM_QTY: 'UPDATE_ITEM_QTY',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_USER_CART: 'UPDATE_USER_CART',

  SET_CHECKOUT_INFORMATION: 'SET_CHECKOUT_INFORMATION',
  UPDATE_CHECKOUT_INFORMATION: 'UPDATE_CHECKOUT_INFORMATION',
}

function reducer(state, action) {
  const {type, payload} = action

  switch (type) {
    case ACTIONS.SET_AUTH_USER: {
      const user = payload || {}
      return { 
        ...state, 
        auth: { user },
        // Switch cart to user's cart if logged in, otherwise use local cart
        cart: user.userId ? user.cart || [] : state.cart
      }
    }
    case ACTIONS.ADD_USER:
      return { ...state, USERS: [...state.USERS, payload] }
    case ACTIONS.UPDATE_USER_PASSWORD:
      return {
        ...state,
        USERS: state.USERS.map(user =>
          user.email === payload.email
            ? { ...user, password: payload.password }
            : user
        )
      }
    case ACTIONS.SET_CART: {
      const isLoggedIn = state.auth.user?.userId
      if(isLoggedIn) {
        // Update cart in USERS array
        return {
          ...state,
          cart: payload || [],
          USERS: state.USERS.map(user =>
            user.userId === state.auth.user.userId
              ? { ...user, cart: payload || [] }
              : user
          )
        }
      }
      // Local cart for guest
      return { ...state, cart: payload || [] }
    }
    case ACTIONS.ADD_TO_CART:
      return { ...state, cart: payload || [] }
    case ACTIONS.UPDATE_ITEM_QTY: {
      const isLoggedIn = state.auth.user?.userId
      const updatedCart = state.cart.map(item =>
        item.productId === payload.productId && item.variantId === payload.variantId
          ? { ...item, quantity: payload.quantity }
          : item
      )
      if(isLoggedIn) {
        // Update cart in USERS array
        return {
          ...state,
          cart: updatedCart,
          USERS: state.USERS.map(user =>
            user.userId === state.auth.user.userId
              ? { ...user, cart: updatedCart }
              : user
          )
        }
      }
      return { ...state, cart: updatedCart }
    }
    case ACTIONS.REMOVE_FROM_CART: {
      const isLoggedIn = state.auth.user?.userId
      const updatedCart = state.cart.filter(
        item => !(item.productId === payload.productId && item.variantId === payload.variantId)
      )
      if(isLoggedIn) {
        // Update cart in USERS array
        return {
          ...state,
          cart: updatedCart,
          USERS: state.USERS.map(user =>
            user.userId === state.auth.user.userId
              ? { ...user, cart: updatedCart }
              : user
          )
        }
      }
      return { ...state, cart: updatedCart }
    }
    case ACTIONS.UPDATE_USER_CART:
      return {
        ...state,
        cart: payload || [],
        USERS: state.USERS.map(user =>
          user.userId === state.auth.user.userId
            ? { ...user, cart: payload || [] }
            : user
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
      const isLoggedIn = state.auth.user?.userId
      if(!isLoggedIn) {
        const cart = localStorage.getItem('ruri_cart')
        if(cart)
          dispatch({
            type: ACTIONS.SET_CART,
            payload: JSON.parse(cart)
          })
      }

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
  }, [state.auth.user?.userId])

  setLocalStorage('ruri_checkout_information', state.checkoutInformation, {})

  useEffect(() => {
    const isLoggedIn = state.auth.user?.userId
    if(!isLoggedIn) {
      try {
        localStorage.setItem('ruri_cart', JSON.stringify(state.cart || []))
      } catch(e) {}
    }
  }, [state.cart, state.auth.user?.userId])

  return (
    <GlobalContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </GlobalContext.Provider>
  )
}

export {reducer, useGlobal, GlobalProvider, ACTIONS}