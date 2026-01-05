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
  
  SET_USER_INFORMATION: 'SET_USER_INFORMATION',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
  SET_DEFAULT_ADDRESS: 'SET_DEFAULT_ADDRESS',
  ADD_ADDRESS: 'ADD_ADDRESS',
  UPDATE_ADDRESS: 'UPDATE_ADDRESS',
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
    case ACTIONS.SET_USER_INFORMATION:
      const updatedUser = {
        ...state.auth.user,
        ...payload
      }
      return { ...state,
        auth: { user: updatedUser },
        USERS: state.USERS.map(u =>
          u.userId === state.auth.user.userId
            ? { ...u, ...updatedUser }
            : u
        )
      }
    case ACTIONS.DELETE_ADDRESS: {
      const updatedUser = {
        ...state.auth.user,
        address: state.auth.user.address.filter(a => a.addressId !== payload)
      }
      return {
        ...state,
        auth: { user: updatedUser },
        USERS: state.USERS.map(u =>
          u.userId === state.auth.user.userId
            ? { ...u, address: updatedUser.address }
            : u
        )
      }
    }
    case ACTIONS.SET_DEFAULT_ADDRESS: {
      const updatedUser = {
        ...state.auth.user,
        address: state.auth.user.address.map(a => ({
          ...a,
          isDefault: a.addressId === payload
        }))
      }
      return {
        ...state,
        auth: { user: updatedUser },
        USERS: state.USERS.map(u =>
          u.userId === state.auth.user.userId
            ? { ...u, address: updatedUser.address }
            : u
        )
      }
    }
    case ACTIONS.ADD_ADDRESS: {
      const newAddress = {
        ...payload,
        addressId: Date.now(),
        isDefault: payload.isDefault || false
      }
      const updatedAddresses = payload.isDefault 
        ? state.auth.user.address.map(a => ({ ...a, isDefault: false })).concat(newAddress)
        : [...state.auth.user.address, newAddress]
      const updatedUser = {
        ...state.auth.user,
        address: updatedAddresses
      }
      return {
        ...state,
        auth: { user: updatedUser },
        USERS: state.USERS.map(u =>
          u.userId === state.auth.user.userId
            ? { ...u, address: updatedAddresses }
            : u
        )
      }
    }
    case ACTIONS.UPDATE_ADDRESS: {
      const updatedAddresses = state.auth.user.address.map(a => {
        if(a.addressId === payload.addressId) {
          const updatedAddress = { ...a, ...payload }
          // If setting this as default, unset other defaults
          if(payload.isDefault) {
            return updatedAddress
          }
          return updatedAddress
        }
        // Unset isDefault on other addresses if this one is being set as default
        if(payload.isDefault && a.isDefault) {
          return { ...a, isDefault: false }
        }
        return a
      })
      const updatedUser = {
        ...state.auth.user,
        address: updatedAddresses
      }
      return {
        ...state,
        auth: { user: updatedUser },
        USERS: state.USERS.map(u =>
          u.userId === state.auth.user.userId
            ? { ...u, address: updatedAddresses }
            : u
        )
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