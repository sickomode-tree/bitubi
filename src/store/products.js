import api, {scope} from 'utils/fetch'
import { checkAuthorized, getToken, isModerator } from 'utils/auth'
import {signOut} from 'store/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

export const VERIFYING_PRODUCT_REQUEST = 'VERIFYING_PRODUCT_REQUEST'
export const VERIFYING_PRODUCT_SUCCESS = 'VERIFYING_PRODUCT_SUCCESS'
export const VERIFYING_PRODUCT_FAILURE = 'VERIFYING_PRODUCT_FAILURE'

export const VERIFIED_PRODUCT_REQUEST = 'VERIFIED_PRODUCT_REQUEST'
export const VERIFIED_PRODUCT_SUCCESS = 'VERIFIED_PRODUCT_SUCCESS'
export const VERIFIED_PRODUCT_FAILURE = 'VERIFIED_PRODUCT_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchProductsRequest = bool => ({ type: FETCH_PRODUCTS_REQUEST, isLoading: bool })
export const onFetchProductsSuccess = json => ({ type: FETCH_PRODUCTS_SUCCESS, products: json })
export const onFetchProductsFailure = bool => ({ type: FETCH_PRODUCTS_FAILURE, isErrored: bool })

export const onVerifyingProductRequest = bool => ({ type: VERIFYING_PRODUCT_REQUEST, isVerifying: bool })
export const onVerifyingProductSuccess = () => ({ type: VERIFYING_PRODUCT_SUCCESS })
export const onVerifyingProductFailure = bool => ({ type: VERIFYING_PRODUCT_FAILURE, isErrored: bool })

export const onVerifiedProductRequest = bool => ({ type: VERIFIED_PRODUCT_REQUEST, isVerified: bool })
export const onVerifiedProductSuccess = () => ({ type: VERIFIED_PRODUCT_SUCCESS })
export const onVerifiedProductFailure = bool => ({ type: VERIFIED_PRODUCT_FAILURE, isErrored: bool })

// ------------------------------------
// Thunks
// ------------------------------------

export function fetchProducts () {
  const isAuthorized = checkAuthorized()
  const controller = isAuthorized ? 'private' : 'public'
  const path = `${scope}${controller}/products`
  let token = null

  return (dispatch, getState) => {
    token = getState().auth.token

    dispatch(onFetchProductsRequest(true))

    api(path)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        if (response.status === 401) {
            dispatch(signOut());
        }

        dispatch(onFetchProductsRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => {
        let cards = []

        json.forEach(product => {
          product.categories.forEach(categoryConfig => {
            if (categoryConfig) {
              let category = categoryConfig.parent

              categoryConfig.children.forEach(subcategory => {
                let card = _.clone(product, true)
                card.category = category
                card.subcategory = subcategory
                // delete card.categories
                cards.push(card)
              })
            }
          })
        })

        return dispatch(onFetchProductsSuccess(cards))
      })
      .catch(error => {
        console.error(error)
        dispatch(onFetchProductsFailure(true))
      })
  }
}

export function verifyingProduct (id, verifying) {
  const formData = new FormData()
  const url = `${scope}private/verifying`
  let token = null

  formData.append('id', id)
  formData.append('verifying', verifying)

  return (dispatch, getState) => {
    dispatch(onVerifyingProductRequest(true))

    token = getState().auth.token

    api(url, {
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
      .catch(error => {
        console.error(error)
        dispatch(onVerifyingProductFailure(true))
      })
  }
}

export function verifiedProduct (id, verified) {
  const formData = new FormData()
  const url = `${scope}private/verify`
  let token = null

  formData.append('id', id)
  formData.append('verified', verified)

  return (dispatch, getState) => {
    dispatch(onVerifiedProductRequest(true))

    token = getState().auth.token

    api(url, {
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

        dispatch(onVerifiedProductRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onVerifiedProductSuccess()))
      .catch(error => {
        console.error(error)
        dispatch(onVerifiedProductFailure(true))
      })
  }
}

export const actions = {
  fetchProducts,
  verifiedProduct,
  verifyingProduct,
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
  [VERIFIED_PRODUCT_REQUEST]: (state, action) => ({
    ...state,
    isVerified: action.isVerified,
  }),
  [VERIFIED_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    isVerified: false,
  }),
  [VERIFIED_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    isVerified: false,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  products: [],
  isLoading: false,
  isVerifying: false,
  isVerified: false,
  isErrored: false,
}

export default function productsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
