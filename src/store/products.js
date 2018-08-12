import {checkAuthorized, getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

export const ACCEPT_PRODUCT_REQUEST = 'ACCEPT_PRODUCT_REQUEST'
export const ACCEPT_PRODUCT_SUCCESS = 'ACCEPT_PRODUCT_SUCCESS'
export const ACCEPT_PRODUCT_FAILURE = 'ACCEPT_PRODUCT_FAILURE'

export const DECLINE_PRODUCT_REQUEST = 'DECLINE_PRODUCT_REQUEST'
export const DECLINE_PRODUCT_SUCCESS = 'DECLINE_PRODUCT_SUCCESS'
export const DECLINE_PRODUCT_FAILURE = 'DECLINE_PRODUCT_FAILURE'

export const VERIFYING_PRODUCT_REQUEST = 'VERIFYING_PRODUCT_REQUEST'
export const VERIFYING_PRODUCT_SUCCESS = 'VERIFYING_PRODUCT_SUCCESS'
export const VERIFYING_PRODUCT_FAILURE = 'VERIFYING_PRODUCT_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchProductsRequest = bool => ({type: FETCH_PRODUCTS_REQUEST, isLoading: bool})
export const onFetchProductsSuccess = json => ({type: FETCH_PRODUCTS_SUCCESS, products: json})
export const onFetchProductsFailure = bool => ({type: FETCH_PRODUCTS_FAILURE, isErrored: bool})

export const onAcceptProductRequest = bool => ({type: ACCEPT_PRODUCT_REQUEST, isAccepting: bool})
export const onAcceptProductSuccess = ()   => ({type: ACCEPT_PRODUCT_SUCCESS})
export const onAcceptProductFailure = bool => ({type: ACCEPT_PRODUCT_FAILURE, isErrored: bool})

export const onDeclineProductRequest = bool => ({type: DECLINE_PRODUCT_REQUEST, isDeclining: bool})
export const onDeclineProductSuccess = ()   => ({type: DECLINE_PRODUCT_SUCCESS})
export const onDeclineProductFailure = bool => ({type: DECLINE_PRODUCT_FAILURE, isErrored: bool})

export const onVerifyingProductRequest = bool => ({type: VERIFYING_PRODUCT_REQUEST, isVerifying: bool})
export const onVerifyingProductSuccess = ()   => ({type: VERIFYING_PRODUCT_SUCCESS})
export const onVerifyingProductFailure = bool => ({type: VERIFYING_PRODUCT_FAILURE, isErrored: bool})

// ------------------------------------
// Thunks
// ------------------------------------

export function fetchProducts() {
  const isAuthorized = checkAuthorized()
  const controller = isAuthorized ? 'private' : 'public'
  const url = `/test/${controller}/products`
  let token = null

  return (dispatch, getState) => {
    token = getState().auth.token

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
              card.verifying = true
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

export function verifyProduct(id, verifying) {
  const formData = new FormData()
  const url = '/test/private/user/products/verifying'
  let token = null

  formData.append('id', id)
  formData.append('verifying', verifying)

  return (dispatch, getState) => {
    dispatch(onVerifyingProductRequest(true))

    token = getState().auth.token

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onVerifyingProductRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onVerifyingProductSuccess()))
      .catch(error => dispatch(onVerifyingProductFailure(true)))
  };
}

export function acceptProduct(id) {
  const formData = new FormData()
  const url = '/test/private/user/products/accept'
  let token = null

  formData.append('id', id)

  return (dispatch, getState) => {
    dispatch(onAcceptProductRequest(true))

    token = getState().auth.token

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onAcceptProductRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onAcceptProductSuccess()))
      .catch(error => dispatch(onAcceptProductFailure(true)))
  };
}

export function declineProduct(id) {
  const formData = new FormData()
  const url = '/test/private/user/products/decline'
  let token = null

  formData.append('id', id)

  return (dispatch, getState) => {
    dispatch(onDeclineProductRequest(true))

    token = getState().auth.token

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onDeclineProductRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onDeclineProductSuccess()))
      .catch(error => dispatch(onDeclineProductFailure(true)))
  };
}

export const actions = {
  fetchProducts,
  acceptProduct,
  declineProduct,
  verifyProduct,
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
    products: action.products,
  }),
  [FETCH_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isErrored: action.isErrored,
  }),
  [ACCEPT_PRODUCT_REQUEST]: (state, action) => ({
    ...state,
    isAccepting: action.isAccepting,
  }),
  [ACCEPT_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    isAccepting: false,
  }),
  [ACCEPT_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    isAccepting: false,
    isErrored: action.isErrored,
  }),
  [DECLINE_PRODUCT_REQUEST]: (state, action) => ({
    ...state,
    isDeclining: action.isDeclining,
  }),
  [DECLINE_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    isDeclining: false,
  }),
  [DECLINE_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    isDeclining: false,
    isErrored: action.isErrored,
  }),
  [VERIFYING_PRODUCT_REQUEST]: (state, action) => ({
    ...state,
    isVerifying: action.isVerifying,
  }),
  [VERIFYING_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    isVerifying: false,
  }),
  [VERIFYING_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    isVerifying: false,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  products: [],
  isLoading: false,
  isAccepting: false,
  isDeclining: false,
  isVerifying: false,
  isErrored: false,
}

export default function productsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
