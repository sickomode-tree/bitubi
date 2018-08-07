import _ from 'lodash'
import {loadState} from './localStorage'

export const guestUserType = 'guest'
export const providerUserType = 'provider'
export const customerUserType = 'customer'

export function getToken() {
  const { token } = loadState().auth

  return token
}

export function getUserType() {
  const { userType } = loadState().auth

  return userType
}

export function checkAuthorized() {
  const token = getToken()

  return !_.isNil(token)
}

export const isCustomer = getUserType() === customerUserType

export const isProvider = getUserType() === providerUserType

export const isGuest = getUserType() === guestUserType
