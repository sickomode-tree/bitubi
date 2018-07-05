// ------------------------------------
// Constants
// ------------------------------------

export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };
}

export function onFetchSuccess(json) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    products: json,
  };
}

export function onFetchError(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
  };
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. */

export function sendRequest(
  url,
  method = "GET",
  formData={},
) {
  let config = {},
    headers = {};

  if (method === "POST") {
    headers['Content-Type'] = "application/x-www-form-urlencoded";
    config.body = new URLSearchParams(formData);
  }

  if (localStorage.getItem("accessToken") !== null && localStorage.getItem("tokenType") !== null) {
    headers['Authorization'] = `${localStorage.getItem("tokenType")} ${localStorage.getItem("accessToken")}`
  }

  config.method = method;
  config.headers = headers;


  return (dispatch) => {
    dispatch(onFetchStart(true));
    fetch(url, config)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(onFetchStart(false));
        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchSuccess(json)))
      .catch(error => dispatch(onFetchError(true)));
  };
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(onFetchError(true));
    }, 5000);
  };
}

export const actions = {
  sendRequest,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ITEMS_HAS_ERRORED]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [ITEMS_IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [ITEMS_FETCH_DATA_SUCCESS]: (state, action) => ({
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
