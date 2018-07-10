import {getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const PRODUCTS_FETCH_ERROR = 'PRODUCTS_FETCH_ERROR'
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCTS_FETCH_SUCCESS'
export const PRODUCTS_IS_LOADING = 'PRODUCTS_IS_LOADING'
export const PRODUCT_SAVE_TO_HISTORY = 'PRODUCT_SAVE_TO_HISTORY'

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: PRODUCTS_IS_LOADING,
    isLoading: bool
  }
}

export function onFetchSuccess(json) {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    products: json,
  }
}

export function onFetchError(bool) {
  return {
    type: PRODUCTS_FETCH_ERROR,
    hasErrored: bool
  }
}

export function onSaveToHistorySuccess() {
  return {
    type: PRODUCT_SAVE_TO_HISTORY,
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. */

export function fetchProducts() {
  const url = '/test/public/products'

  return (dispatch) => {
    dispatch(onFetchStart(true))

    fetch(url)
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

export function saveToHistory(id) {
  const formData = new FormData()
  const url = '/test/private/user/history'

  formData.append('id', id)

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
      .then(json => dispatch(onSaveToHistorySuccess()))
      .catch(error => dispatch(onFetchError(true)))
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
  fetchProducts,
  saveToHistory,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PRODUCTS_FETCH_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [PRODUCTS_IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [PRODUCTS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    products: action.products
  }),
  [PRODUCT_SAVE_TO_HISTORY]: (state, action) => ({
    ...state,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  products: [],
  isLoading: false,
  isErrored: false,
};

export default function productsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
