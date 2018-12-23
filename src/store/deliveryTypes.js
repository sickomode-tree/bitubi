import {browserHistory} from 'react-router'
import {signOut} from 'store/auth'
import api, {scope} from 'utils/fetch'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_DELIVERY_TYPES_REQUEST = 'FETCH_DELIVERY_TYPES_REQUEST'
export const FETCH_DELIVERY_TYPES_SUCCESS = 'FETCH_DELIVERY_TYPES_SUCCESS'
export const FETCH_DELIVERY_TYPES_FAILURE = 'FETCH_DELIVERY_TYPES_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchDeliveryTypesRequest = bool => ({ type: FETCH_DELIVERY_TYPES_REQUEST, isLoading: bool })
export const onFetchDeliveryTypesSuccess = json => ({ type: FETCH_DELIVERY_TYPES_SUCCESS, deliveryTypes: json })
export const onFetchDeliveryTypesFailure = bool => ({ type: FETCH_DELIVERY_TYPES_FAILURE, isErrored: bool })

// ------------------------------------
// Thunks
// ------------------------------------

export function fetchDeliveryTypes () {
  const url = `${scope}public/deliveryTypes`

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchDeliveryTypesRequest(true))

    api(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            //dispatch(signOut())
            //browserHistory.push('/')
          }

          throw Error(response.statusText)
        }

        dispatch(onFetchDeliveryTypesRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchDeliveryTypesSuccess(json)))
      .catch(error => {
        console.error(error)
        return dispatch(onFetchDeliveryTypesFailure(true))
      })
  }
}

export const actions = {
  fetchDeliveryTypes,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_DELIVERY_TYPES_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_DELIVERY_TYPES_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    deliveryTypes: action.deliveryTypes,
  }),
  [FETCH_DELIVERY_TYPES_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  deliveryTypes: [],
  isLoading: false,
  isErrored: false,
}

export default function deliveryTypesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
