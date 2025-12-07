import { createContext, useContext, useReducer } from 'react';
import { initialState } from './initialState'

const GlobalContext = createContext();

const ACTIONS = {
  SET_SELECTED_STUDENT: 'set_selected_student',
  SET_PREREQUISITE_STATUS: 'set_prerequisite_status',
};

function reducer(state, action) {
  const {type, payload} = action;

  switch (type) {
    case ACTIONS.SET_SELECTED_STUDENT:
      if (state.selectedStudent?.name === payload.name) {
        return state;
      }
      return { ...state,
        selectedStudent: {
          ...payload
        }
      };
    case ACTIONS.SET_PREREQUISITE_STATUS:
      return { ...state,
        courseStatus: {
          ...payload
        }
      }
    default:
      return state;
  }
}

function useGlobal() {
  return useContext(GlobalContext);
}

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export {reducer, useGlobal, GlobalProvider, ACTIONS}