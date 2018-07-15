import _ from 'lodash'
import {loadState} from './localStorage'

export function getToken() {
  const { token } = loadState().auth

  return token
}

export function checkAuthorized() {
  const token = getToken()

  console.log('isAuthorized', !_.isNil(token))

  return !_.isNil(token)
}
