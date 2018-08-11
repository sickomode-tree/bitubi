import {combineReducers} from 'redux'
import authReducer from './auth'
import categoriesReducer from './categories'
import citiesReducer from './cities'
import filterReducer from './filter'
import locationReducer from './location'
import productsReducer from './products'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    cities: citiesReducer,
    filter: filterReducer,
    location: locationReducer,
    products: productsReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, {key, reducer}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
