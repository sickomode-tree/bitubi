import {getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const TENDERS_IS_LOADING = 'TENDERS_IS_LOADING'
export const TENDERS_FETCH_SUCCESS = 'TENDERS_FETCH_SUCCESS'
export const TENDERS_FETCH_ERROR = 'TENDERS_FETCH_ERROR'
export const TENDER_SAVE_SUCCESS = 'TENDER_SAVE_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: TENDERS_IS_LOADING,
    isLoading: bool,
  };
}

export function onFetchError(bool) {
  return {
    type: TENDERS_FETCH_ERROR,
    hasErrored: bool,
  };
}

export function onFetchSuccess(json) {
  return {
    type: TENDERS_FETCH_SUCCESS,
    items: json,
  };
}

export function onSaveTenderSuccess() {
  return {
    type: TENDER_SAVE_SUCCESS,
  };
}

export function fetchTenders() {
  const url = '/test/private/user/tenders'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchStart(true));
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onFetchStart(false))

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchSuccess(json)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function saveTender(form) {
  const formData = new FormData(form)
  const url = '/test/private/user/tenders'

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
      .then(json => dispatch(onSaveTenderSuccess()))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export const actions = {
  fetchTenders,
  saveTender,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TENDERS_FETCH_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [TENDERS_IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [TENDERS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    items: action.items,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  items: [],
  isLoading: false,
  isErrored: false,
};

export default function tendersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
