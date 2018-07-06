// ------------------------------------
// Constants
// ------------------------------------

export const PRODUCTS_HAS_ERRORED = 'PRODUCTS_HAS_ERRORED';
export const PRODUCTS_IS_LOADING = 'PRODUCTS_IS_LOADING';
export const PRODUCTS_FETCH_DATA_SUCCESS = 'PRODUCTS_FETCH_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: 'PRODUCTS_IS_LOADING',
    isLoading: bool
  };
}

export function onFetchSuccess(json) {
  return {
    type: 'PRODUCTS_FETCH_DATA_SUCCESS',
    products: json,
  };
}

export function onFetchError(bool) {
  return {
    type: 'PRODUCTS_HAS_ERRORED',
    hasErrored: bool
  };
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. */

export function fetchProducts() {
  const url = '/test/public/products';

  return (dispatch) => {
    dispatch(onFetchStart(true));

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(onFetchStart(false));

        return response;
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => dispatch(onFetchError(true)));
  };
}

export function errorAfterFiveSeconds() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(onFetchError(true));
    }, 5000);
  };
}

export const actions = {
  fetchProducts,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PRODUCTS_HAS_ERRORED]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [PRODUCTS_IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [PRODUCTS_FETCH_DATA_SUCCESS]: (state, action) => ({
    ...state,
    products: action.products
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
