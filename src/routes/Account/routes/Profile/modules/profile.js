import {getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const USER_IS_LOADING = 'USER_IS_LOADING'
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const USER_FETCH_ERROR = 'USER_FETCH_ERROR'

export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: USER_IS_LOADING,
    isLoading: bool
  };
}

export function onFetchSuccess(json) {
  return {
    type: USER_FETCH_SUCCESS,
    user: json,
  };
}

export function onFetchError(bool) {
  return {
    type: USER_FETCH_ERROR,
    hasErrored: bool
  };
}

export function onUpdateUserSuccess() {
  fetchUser()

  return {
    type: USER_UPDATE_SUCCESS,
  };
}

export function fetchUser() {
  const url = '/test/private/user';

  return (dispatch, getState) => {
    const token = getState().auth.token;

    dispatch(onFetchStart(true));
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(onFetchStart(false));

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchSuccess(json)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function updateUser(form) {
  const formData = new FormData(form)
  const url = '/test/private/user/edit'

  return (dispatch) => {
    dispatch(onFetchStart(true))

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${getToken()}`
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onFetchStart(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onUpdateUserSuccess()))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export const actions = {
  fetchUser,
  updateUser,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_FETCH_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [USER_IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [USER_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    user: action.user,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  user: {},
  isLoading: false,
  isErrored: false,
};

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
