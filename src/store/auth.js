import { browserHistory } from 'react-router'
import Notifications from 'react-notification-system-redux'
import _ from 'lodash'
import api from 'utils/fetch'

// ------------------------------------
// Constants
// ------------------------------------

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
export const SIGN_OUT = 'SIGN_OUT'

const defaultUserType = 'guest'

// ------------------------------------
// Actions
// ------------------------------------

export const onSignUpRequest = bool => ({ type: SIGN_UP_REQUEST, isLoading: bool })
export const onSignUpSuccess = json => {
  const token = json.accessToken
  const userType = json.userType || defaultUserType

  browserHistory.push('/')

  if (!_.isNil(token)) {
    return {
      type: SIGN_UP_SUCCESS,
      token: token,
      userType: userType,
    }
  }
}
export const onSignUpFailure = bool => ({ type: SIGN_UP_FAILURE, isErrored: bool })

export const onSignInRequest = bool => ({ type: SIGN_IN_REQUEST, isLoading: bool })
export const onSignInSuccess = json => {
  const token = json.accessToken
  const userType = json.userType || defaultUserType

  browserHistory.push('/')

  if (!_.isNil(token)) {
    return {
      type: SIGN_IN_SUCCESS,
      token: token,
      userType: userType,
    }
  }
}
export const onSignInFailure = bool => ({ type: SIGN_IN_FAILURE, isErrored: bool })

export const onSignOut = () => ({ type: SIGN_OUT })

// ------------------------------------
// Thunks
// ------------------------------------

export function sendSingInRequest (form) {
  const formData = new FormData(form)
  const url = '/auth/signin'

  return (dispatch, getState) => {
    dispatch(onSignInRequest(true))

    api(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onSignInRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSignInSuccess(json)))
      .catch(error => {
        dispatch(Notifications.error({
          title: 'Не удалось войти в систему',
          message: 'Пожалуйста, попробуйте еще раз.',
          position: 'bl',
        }))
        console.error(error)
        dispatch(onSignInFailure(true))
      })
  }
}

export function sendSingUpRequest (form) {
  const formData = new FormData(form)
  const url = '/auth/signup'

  return (dispatch) => {
    dispatch(onSignUpRequest(true))

    api(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          dispatch(Notifications.error({
            title: 'Не удалось зарегистрироваться',
            message: 'Пожалуйста, попробуйте еще раз.',
            position: 'bl',
          }))
          throw Error(response.statusText)
        }

        dispatch(onSignUpRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSignUpSuccess(json)))
      .catch(error => {
        dispatch(Notifications.error({
          title: 'Не удалось зарегистрироваться',
          message: 'Пожалуйста, попробуйте еще раз.',
          position: 'bl',
        }))
        console.error(error)
        dispatch(onSignUpFailure(true))
      })
  }
}

export function signOut () {
  return (dispatch) => {
    dispatch(onSignOut())
  }
}

export function errorAfterFiveSeconds () {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(onFetchError(true))
    }, 5000)
  }
}

export const actions = {
  sendSingInRequest,
  sendSingUpRequest,
  signOut,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGN_UP_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [SIGN_UP_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    isAuthorized: true,
    token: action.token,
    userType: action.userType,
  }),
  [SIGN_UP_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isAuthorized: false,
    isErrored: action.isErrored,
    userType: defaultUserType,
    token: null,
  }),
  [SIGN_IN_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [SIGN_IN_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    isAuthorized: true,
    token: action.token,
    userType: action.userType,
  }),
  [SIGN_IN_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isAuthorized: false,
    isErrored: action.isErrored,
    userType: defaultUserType,
    token: null,
  }),
  [SIGN_OUT]: (state, action) => ({
    ...state,
    isLoading: false,
    isAuthorized: false,
    userType: defaultUserType,
    token: null,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  isErrored: false,
  isAuthorized: false,
  token: null,
  userType: defaultUserType,
}

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
