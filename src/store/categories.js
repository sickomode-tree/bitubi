// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchCategoriesRequest = bool => ({type: FETCH_CATEGORIES_REQUEST, isLoading: bool})
export const onFetchCategoriesSuccess = json => ({type: FETCH_CATEGORIES_SUCCESS, categories: json})
export const onFetchCategoriesFailure = bool => ({type: FETCH_CATEGORIES_FAILURE, isErrored: bool})

// ------------------------------------
// Thunks
// ------------------------------------

export function fetchCategories() {
  const url = '/test/public/categories'

  return (dispatch) => {
    dispatch(onFetchCategoriesRequest(true))

    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onFetchCategoriesRequest(false))

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchCategoriesSuccess(json)))
      .catch(error => {
        console.error(error)
        return dispatch(onFetchCategoriesFailure(true))
      })
  };
}

export const actions = {
  fetchCategories,
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_CATEGORIES_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    categories: action.categories
  }),
  [FETCH_CATEGORIES_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  categories: [],
  isLoading: false,
  isErrored: false,
}

export default function categoriesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
