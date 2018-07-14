import _ from 'lodash'
import {loadState} from "./localStorage";

const tokenKey = 'accessToken';

export function getToken() {
  const { token } = loadState().auth

  return token
}
