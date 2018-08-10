import {checkAuthorized, getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

export const PRODUCT_SAVE_TO_HISTORY = 'PRODUCT_SAVE_TO_HISTORY'
export const PRODUCT_SAVE_TO_FAVOURITES = 'PRODUCT_SAVE_TO_FAVOURITES'

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

export const FETCH_SUBCATEGORIES_REQUEST = 'FETCH_SUBCATEGORIES_REQUEST'
export const FETCH_SUBCATEGORIES_SUCCESS = 'FETCH_SUBCATEGORIES_SUCCESS'
export const FETCH_SUBCATEGORIES_FAILURE = 'FETCH_SUBCATEGORIES_FAILURE'

export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST'
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS'
export const FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchProductsRequest = bool => ({type: FETCH_PRODUCTS_REQUEST, isLoading: bool})
export const onFetchProductsSuccess = json => ({type: FETCH_PRODUCTS_SUCCESS, products: json})
export const onFetchProductsFailure = bool => ({type: FETCH_PRODUCTS_FAILURE, isErrored: bool})

export const onFetchCategoriesRequest = bool => ({type: FETCH_CATEGORIES_REQUEST, isLoading: bool})
export const onFetchCategoriesSuccess = json => ({type: FETCH_CATEGORIES_SUCCESS, categories: json})
export const onFetchCategoriesFailure = bool => ({type: FETCH_CATEGORIES_FAILURE, isErrored: bool})

export const onFetchSubcategoriesRequest = bool => ({type: FETCH_SUBCATEGORIES_REQUEST, isLoading: bool})
export const onFetchSubcategoriesSuccess = json => ({type: FETCH_SUBCATEGORIES_SUCCESS, subcategories: json})
export const onFetchSubcategoriesFailure = bool => ({type: FETCH_SUBCATEGORIES_FAILURE, isErrored: bool})

export const onFetchCitiesRequest = bool => ({type: FETCH_CITIES_REQUEST, isLoading: bool})
export const onFetchCitiesSuccess = json => ({type: FETCH_CITIES_SUCCESS, cities: json})
export const onFetchCitiesFailure = bool => ({type: FETCH_CITIES_FAILURE, isErrored: bool})

export const onSaveToHistorySuccess = () => ({type: PRODUCT_SAVE_TO_HISTORY})

export const onSaveToFavouritesSuccess = id => ({type: PRODUCT_SAVE_TO_FAVOURITES, id: id})

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. */

export function fetchProducts() {
  const isAuthorized = checkAuthorized()
  const controller = isAuthorized ? 'private' : 'public'
  const url = `/test/${controller}/products`

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchProductsRequest(true))

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

        dispatch(onFetchProductsRequest(false))

        return response;
      })
      .then(response => response.json())
      .then(json => {
        let cards = []

        json.forEach(product => {
          product.categories.forEach(categoryConfig => {
            let category = categoryConfig.parent

            categoryConfig.children.forEach(subcategory => {
              let card = _.clone(product, true)
              card.category = category
              card.subcategory = subcategory
              // delete card.categories
              cards.push(card)
            })
          })
        })

        return dispatch(onFetchProductsSuccess(cards))
      })
      .catch(error => dispatch(onFetchProductsFailure(true)))
  };
}

export function fetchCategories() {
  const url = '/test/public/categories'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchCategoriesRequest(true))

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

        dispatch(onFetchCategoriesRequest(false))

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchCategoriesSuccess(json)))
      .catch(error => dispatch(onFetchCategoriesFailure(true)))
  };
}

export function fetchSubcategories() {
  const url = '/test/public/subcategories'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchSubcategoriesRequest(true))

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

        dispatch(onFetchSubcategoriesRequest(false))

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchSubcategoriesSuccess(json)))
      .catch(error => dispatch(onFetchSubcategoriesFailure(true)))
  };
}

export function fetchCities() {
  const url = '/test/public/cities'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchCitiesRequest(true))

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

        dispatch(onFetchCitiesRequest(false))

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchCitiesSuccess(json)))
      .catch(error => dispatch(onFetchCitiesFailure(true)))
  };
}

export function saveToHistory(id) {
  const formData = new FormData()
  const url = '/test/private/user/history'

  formData.append('id', id)

  return (dispatch) => {
    // dispatch(onFetchProductsRequest(true))

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

        dispatch(onFetchProductsRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSaveToHistorySuccess()))
      .catch(error => dispatch(onFetchProductsFailure(true)))
  };
}

export function saveToFavourites(id) {
  const formData = new FormData()
  const url = '/test/private/user/favourites'

  formData.append('id', id)

  return (dispatch) => {
    // dispatch(onFetchProductsRequest(true))

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

        dispatch(onFetchProductsRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSaveToFavouritesSuccess(id)))
      .catch(error => dispatch(onFetchProductsFailure(true)))
  };
}

export function errorAfterFiveSeconds() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(onFetchProductsFailure(true))
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
  [FETCH_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    isErrored: action.isErrored,
    isLoading: false,
  }),
  [FETCH_PRODUCTS_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_PRODUCTS_SUCCESS]: (state, action) => ({
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
  [FETCH_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    categories: action.categories
  }),
  [FETCH_SUBCATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    subcategories: action.subcategories
  }),
  [FETCH_CITIES_SUCCESS]: (state, action) => ({
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
