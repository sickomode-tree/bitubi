import _ from 'lodash'

const tokenKey = 'accessToken';

export function checkAuth() {
  const token = getToken();
  return !_.isNil(token);
}

export function setToken(token) {
  return localStorage.setItem(tokenKey, token)
}

export function getToken() {
  return localStorage.getItem(tokenKey)
}

export function removeToken() {
  return localStorage.removeItem(tokenKey)
}
