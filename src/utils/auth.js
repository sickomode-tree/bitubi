import _ from 'lodash'
import {loadState} from "./localStorage";

const tokenKey = 'accessToken';

export function checkAuth() {
  const { token } = loadState().auth
  return !_.isNil(token);
}

export function getToken() {
  const { token } = loadState().auth

  return token
}
