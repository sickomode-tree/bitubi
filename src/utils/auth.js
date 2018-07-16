import _ from 'lodash'
import {loadState} from './localStorage'

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

  console.log('isAuthorized', !_.isNil(token))

  return !_.isNil(token)
}
