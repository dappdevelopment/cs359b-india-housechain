import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = persistReducer(persistConfig, reducers)


export default () => {
  let Store = createStore(reducer)
  let Persistor = persistStore(Store)
  return { Store, Persistor }
}

// const Store = createStore(reducer)
// export default Store