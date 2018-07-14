import {getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const PRODUCTS_FETCH_ERROR = 'PRODUCTS_FETCH_ERROR'
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCTS_FETCH_SUCCESS'
export const PRODUCTS_IS_LOADING = 'PRODUCTS_IS_LOADING'

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: PRODUCTS_IS_LOADING,
    isLoading: bool,
  }
}

export function onFetchSuccess(key, json) {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    key: key,
    value: json,
  }
}

export function onFetchError(bool) {
  return {
    type: PRODUCTS_FETCH_ERROR,
    hasErrored: bool,
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
      .then(json => dispatch(onFetchSuccess('products', json)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function fetchCategories() {
  const url = '/test/public/categories'

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
      .then(json => dispatch(onFetchSuccess('categories', json)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function fetchSubcategories() {
  const url = '/test/public/subcategories'

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
      .then(json => dispatch(onFetchSuccess('subcategories', json)))
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
  fetchCategories,
  fetchSubcategories,
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
    [action.key]: action.value
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
