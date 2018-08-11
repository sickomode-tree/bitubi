import _ from 'lodash'
import {loadState} from './localStorage'

export const guestUserType = 'guest'
export const customerUserType = 'customer'
export const providerUserType = 'provider'
export const moderatorUserType = 'moderator'

export function getToken() {
  const state = loadState()
  let token = null

  if (!_.isNil(state)) {
    token = state.auth.token
  }

  return token
}

export function getUserType() {
  const state = loadState()
  let userType = null

  if (!_.isNil(state)) {
    userType = state.auth.userType
  }

  return userType
}

export function checkAuthorized() {
  const token = getToken()

  return !_.isNil(token)
}

export const isCustomer = getUserType() === customerUserType

export const isProvider = getUserType() === providerUserType

export const isModerator = getUserType() === moderatorUserType

export const isGuest = getUserType() === guestUserType
