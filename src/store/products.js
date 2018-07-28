import {checkAuthorized, getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const PRODUCTS_FETCH_ERROR = 'PRODUCTS_FETCH_ERROR'
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCTS_FETCH_SUCCESS'
export const PRODUCTS_IS_LOADING = 'PRODUCTS_IS_LOADING'
export const PRODUCT_SAVE_TO_HISTORY = 'PRODUCT_SAVE_TO_HISTORY'
export const PRODUCT_SAVE_TO_FAVOURITES = 'PRODUCT_SAVE_TO_FAVOURITES'
export const CATEGORIES_FETCH_SUCCESS = 'CATEGORIES_FETCH_SUCCESS'
export const SUBCATEGORIES_FETCH_SUCCESS = 'SUBCATEGORIES_FETCH_SUCCESS'
export const CITIES_FETCH_SUCCESS = 'CITIES_FETCH_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: PRODUCTS_IS_LOADING,
    isLoading: bool,
  }
}

export function onFetchSuccess(json) {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    products: json,
  }
}

export function onFetchCategoriesSuccess(json) {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    categories: json,
  }
}

export function onFetchSubcategoriesSuccess(json) {
  return {
    type: SUBCATEGORIES_FETCH_SUCCESS,
    subcategories: json,
  }
}

export function onFetchCitiesSuccess(json) {
  return {
    type: CITIES_FETCH_SUCCESS,
    cities: json,
  }
}

export function onFetchError(bool) {
  return {
    type: PRODUCTS_FETCH_ERROR,
    isErrored: bool,
  }
}

export function onSaveToHistorySuccess() {
  return {
    type: PRODUCT_SAVE_TO_HISTORY,
  }
}

export function onSaveToFavouritesSuccess(id) {
  return {
    type: PRODUCT_SAVE_TO_FAVOURITES,
    id: id,
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. */

export function fetchProducts() {
  const isAuthorized = checkAuthorized()
  const controller = isAuthorized ? 'private' : 'public'
  const url = `/test/${controller}/products`

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchStart(true))

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

export function fetchCategories() {
  const url = '/test/public/categories'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchStart(true))

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
      .then(json => dispatch(onFetchCategoriesSuccess(json)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function fetchSubcategories() {
  const url = '/test/public/subcategories'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchStart(true))

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
      .then(json => dispatch(onFetchSubcategoriesSuccess(json)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function fetchCities() {
  const url = '/test/public/cities'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchStart(true))

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
      .then(json => dispatch(onFetchCitiesSuccess(json)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function saveToHistory(id) {
  const formData = new FormData()
  const url = '/test/private/user/history'

  formData.append('id', id)

  return (dispatch) => {
    // dispatch(onFetchStart(true))

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

export function saveToFavourites(id) {
  const formData = new FormData()
  const url = '/test/private/user/favourites'

  formData.append('id', id)

  return (dispatch) => {
    // dispatch(onFetchStart(true))

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
      .then(json => dispatch(onSaveToFavouritesSuccess(id)))
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
  fetchCities,
  saveToHistory,
  saveToFavourites,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PRODUCTS_FETCH_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.isErrored,
    isLoading: action.isLoading,
  }),
  [PRODUCTS_IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [PRODUCTS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    products: action.products
  }),
  [PRODUCT_SAVE_TO_FAVOURITES]: (state, action) => ({
    ...state,
    products: state.products.map(product => {
      if (product.id === action.id) {
        product.favourite = !product.favourite
      }
      return product
    })
  }),
  [CATEGORIES_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    categories: action.categories
  }),
  [SUBCATEGORIES_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    subcategories: action.subcategories
  }),
  [CITIES_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    cities: action.cities
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  products: [],
  categories: [],
  subcategories: [],
  cities: [],
  isLoading: false,
  isErrored: false,
};

export default function productsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
