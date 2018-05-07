import { combineReducers } from 'redux'


let initialState = {}

function App(state = initialState, payload) {
  switch (payload.type) {
    case 'CONNECT_UPORT':
      return {
        ...state,
        uport: payload.data
      }
    case 'USER_ACCOUNT':
      return {
        ...state,
        userAccount: payload.text
      }
    case 'CONTRACT':
      return {
        ...state,
        contract: payload.data
      }
    default:
      return state
  }
}

const reducers = combineReducers({
  App
})

export default reducers