import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------

export const AUTH_REQUEST_SENT = 'AUTH_REQUEST_SENT';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const SIGN_OUT = 'SIGN_OUT';

// ------------------------------------
// Actions
// ------------------------------------

export function onSendRequestStart(bool) {
  return {
    type: AUTH_REQUEST_SENT,
    isLoading: bool
  };
}

export function onSendRequestSuccess(json) {
  const token = json.accessToken;

  if (!_.isNil(token)) {
    return {
      type: AUTH_REQUEST_SUCCESS,
      token: token,
    };
  }
}

export function onSendRequestError(bool) {
  return {
    type: AUTH_REQUEST_ERROR,
    hasErrored: bool
  };
}

export function onSignOut() {
  return {
    type: SIGN_OUT,
  };
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. */
export function sendAuthRequest(form) {
  const formData = new FormData(form);
  const url = '/test/auth/signin';

  return (dispatch) => {
    dispatch(onSendRequestStart(true));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(onSendRequestStart(false));

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onSendRequestSuccess(json)))
      .catch(error => dispatch(onSendRequestError(true)))
  };
}

export function sendRegisterRequest(form) {
  const formData = new FormData(form);
  const url = '/test/auth/signup';

  return (dispatch) => {
    dispatch(onSendRequestStart(true));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(onSendRequestStart(false));

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onSendRequestSuccess(json)))
      .catch(error => dispatch(onSendRequestError(true)))
  };
}

export function signOut() {
  return (dispatch) => {
    dispatch(onSignOut())
  };
}

export function errorAfterFiveSeconds() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(onFetchError(true))
    }, 5000);
  };
}

export const actions = {
  sendAuthRequest,
  sendRegisterRequest,
  signOut,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [AUTH_REQUEST_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [AUTH_REQUEST_SENT]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [AUTH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    isAuthorized: true,
    token: action.token,
  }),
  [SIGN_OUT]: (state, action) => ({
    ...state,
    isAuthorized: false,
    token: null,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  isErrored: false,
  isAuthorized: false,
  token: null,
};

export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
