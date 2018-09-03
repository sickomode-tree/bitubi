import Notifications from 'react-notification-system-redux'
import { getToken } from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchUserRequest = bool => ({ type: FETCH_USER_REQUEST, isLoading: bool })
export const onFetchUserSuccess = json => ({ type: FETCH_USER_SUCCESS, user: json })
export const onFetchUserFailure = bool => ({ type: FETCH_USER_FAILURE, isErrored: bool })

export const onUpdateUserRequest = bool => ({ type: UPDATE_USER_REQUEST, isLoading: bool })
export const onUpdateUserSuccess = () => ({ type: UPDATE_USER_SUCCESS })
export const onUpdateUserFailure = bool => ({ type: UPDATE_USER_FAILURE, isErrored: bool })

export const onUpdateUserpicRequest = () => ({ type: UPDATE_USERPIC_REQUEST })
export const onUpdateUserpicSuccess = () => ({ type: UPDATE_USERPIC_SUCCESS })
export const onUpdateUserpicFailure = () => ({ type: UPDATE_USERPIC_FAILURE })

export const fetchUser = () => {
  const url = '/test/private/user'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchUserRequest(true))
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onFetchUserRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchUserSuccess(json)))
      .catch(error => {
        console.error(error)
        dispatch(onFetchUserFailure(true))
      })
  }
}

export const updateUser = form => {
  const formData = new FormData(form)
  const url = '/test/private/user/edit'

  return (dispatch) => {
    dispatch(onUpdateUserRequest(true))

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

        dispatch(onUpdateUserRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onUpdateUserSuccess()))
      .catch(error => dispatch(onUpdateUserFailure(true)))
  }
}

export const updateUserpic = file => {
  const url = '/test/private/uploadFile'
  const formData = new FormData()

  formData.append('file', file)

  return (dispatch) => {
    dispatch(onUpdateUserRequest(true))

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(onUpdateUserRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onUpdateUserSuccess()))
      .catch(error => {
        dispatch(Notifications.error({
          title: 'Не удалось войти в систему',
          message: 'Пожалуйста, попробуйте еще раз.',
          position: 'bl',
        }))
        dispatch(onUpdateUserFailure(true))
      })
  }
}

export const actions = {
  fetchUser,
  updateUser,
  updateUserpic,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_USER_SUCCESS]: (state, action) => ({
    ...state,
    user: action.user,
  }),
  [FETCH_USER_FAILURE]: (state, action) => ({
    ...state,
    isErrored: action.isErrored,
  }),
  [UPDATE_USER_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [UPDATE_USER_FAILURE]: (state, action) => ({
    ...state,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  user: {},
  isLoading: false,
  isErrored: false,
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
