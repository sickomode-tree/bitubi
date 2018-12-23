import { combineReducers } from 'redux'
import { reducer as notificationsReducer } from 'react-notification-system-redux'
import authReducer from './auth'
import activityDescriptorsReducer from './activityDescriptors'
import categoriesReducer from './categories'
import citiesReducer from './cities'
import deliveryTypesReducer from './deliveryTypes'
import filterReducer from './filter'
import locationReducer from './location'
import productsReducer from './products'
import userReducer from './user'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    auth: authReducer,
    activityDescriptors: activityDescriptorsReducer,
    categories: categoriesReducer,
    cities: citiesReducer,
    deliveryTypes: deliveryTypesReducer,
    filter: filterReducer,
    location: locationReducer,
    products: productsReducer,
    user: userReducer,
    notifications: notificationsReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
