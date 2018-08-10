import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT = 'SIGN_OUT';

const defaultUserType = 'guest'

// ------------------------------------
// Actions
// ------------------------------------

export function onAuthRequestSent(bool) {
  return {
    type: SIGN_IN_REQUEST,
    isLoading: bool
  };
}

export function onAuthRequestSuccess(json) {
  const token = json.accessToken
  const userType = json.userType || defaultUserType

  if (!_.isNil(token)) {
    return {
      type: SIGN_IN_SUCCESS,
      token: token,
      userType: userType,
    };
  }
}

export function onAuthRequestError(bool) {
  return {
    type: SIGN_IN_FAILURE,
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
    dispatch(onAuthRequestSent(true));

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

        dispatch(onAuthRequestSent(false));

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onAuthRequestSuccess(json)))
      .catch(error => dispatch(onAuthRequestError(true)))
  };
}

export function sendRegisterRequest(form) {
  const formData = new FormData(form);
  const url = '/test/auth/signup';

  return (dispatch) => {
    dispatch(onAuthRequestSent(true));

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

        dispatch(onAuthRequestSent(false));

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onAuthRequestSuccess(json)))
      .catch(error => dispatch(onAuthRequestError(true)))
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
  [SIGN_IN_FAILURE]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
    token: null,
    userType: defaultUserType,
    isAuthorized: false,
    isLoading: false
  }),
  [SIGN_IN_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [SIGN_IN_SUCCESS]: (state, action) => ({
    ...state,
    isAuthorized: true,
    token: action.token,
    userType: action.userType,
  }),
  [SIGN_OUT]: (state, action) => ({
    ...state,
    isAuthorized: false,
    token: null,
    userType: defaultUserType,
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
  userType: defaultUserType,
};

export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
