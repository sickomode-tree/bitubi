import {browserHistory} from 'react-router'
import {signOut} from 'store/auth'
import api, {scope} from 'utils/fetch'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_ACTIVITY_DESCRIPTORS_REQUEST = 'FETCH_ACTIVITY_DESCRIPTORS_REQUEST'
export const FETCH_ACTIVITY_DESCRIPTORS_SUCCESS = 'FETCH_ACTIVITY_DESCRIPTORS_SUCCESS'
export const FETCH_ACTIVITY_DESCRIPTORS_FAILURE = 'FETCH_ACTIVITY_DESCRIPTORS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchActivityDescriptorsRequest = bool => ({ type: FETCH_ACTIVITY_DESCRIPTORS_REQUEST, isLoading: bool })
export const onFetchActivityDescriptorsSuccess = json => ({ type: FETCH_ACTIVITY_DESCRIPTORS_SUCCESS, activityDescriptors: json })
export const onFetchActivityDescriptorsFailure = bool => ({ type: FETCH_ACTIVITY_DESCRIPTORS_FAILURE, isErrored: bool })

// ------------------------------------
// Thunks
// ------------------------------------

export function fetchActivityDescriptors () {
  const url = `${scope}public/activityDescriptors`

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchActivityDescriptorsRequest(true))

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

      dispatch(onFetchActivityDescriptorsRequest(false))

      return response
    })
    .then(response => response.json())
    .then(json => dispatch(onFetchActivityDescriptorsSuccess(json)))
    .catch(error => {
      console.error(error)
      return dispatch(onFetchActivityDescriptorsFailure(true))
    })
  }
}

export const actions = {
  fetchActivityDescriptors,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_ACTIVITY_DESCRIPTORS_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_ACTIVITY_DESCRIPTORS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    activityDescriptors: action.activityDescriptors,
  }),
  [FETCH_ACTIVITY_DESCRIPTORS_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  activityDescriptors: [],
  isLoading: false,
  isErrored: false,
}

export default function activityDescriptorsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
