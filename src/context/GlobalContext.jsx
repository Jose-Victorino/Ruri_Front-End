import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState } from './initialState'

const GlobalContext = createContext();

const ACTIONS = {
  SET_CART: 'SET_CART',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_ITEM_QTY: 'UPDATE_ITEM_QTY',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

function reducer(state, action) {
  const {type, payload} = action;

  switch (type) {
    case ACTIONS.SET_CART:
      return { ...state, cart: payload || [] };
    case ACTIONS.ADD_TO_CART:
      return { ...state, cart: payload || [] };
    case ACTIONS.UPDATE_ITEM_QTY:
      return { ...state, cart: payload || [] };
    case ACTIONS.REMOVE_FROM_CART:
      return { ...state, cart: payload || [] };
    default:
      return state;
  }
}

function useGlobal() {
  return useContext(GlobalContext);
}

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ruri_cart');
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: ACTIONS.SET_CART, payload: parsed });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ruri_cart', JSON.stringify(state.cart || []));
    } catch (e) {
      // ignore
    }
  }, [state.cart]);

  return (
    <GlobalContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </GlobalContext.Provider>
  );
}

export {reducer, useGlobal, GlobalProvider, ACTIONS}