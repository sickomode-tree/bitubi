import {checkAuthorized, getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchProductsRequest = bool => ({type: FETCH_PRODUCTS_REQUEST, isLoading: bool})
export const onFetchProductsSuccess = json => ({type: FETCH_PRODUCTS_SUCCESS, products: json})
export const onFetchProductsFailure = bool => ({type: FETCH_PRODUCTS_FAILURE, isErrored: bool})

// ------------------------------------
// Thunks
// ------------------------------------

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

export const actions = {
  fetchProducts,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_PRODUCTS_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    products: action.products
  }),
  [FETCH_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  products: [],
  isLoading: false,
  isErrored: false,
}

export default function productsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
