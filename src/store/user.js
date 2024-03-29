import {browserHistory} from 'react-router'
import {signOut} from 'store/auth'
import Notifications from 'react-notification-system-redux'
import axios from 'axios'
import { getToken } from 'utils/auth'
import api, { scope, rootUrl } from 'utils/fetch'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

export const UPDATE_USERPIC_REQUEST = 'UPDATE_USERPIC_REQUEST'
export const UPDATE_USERPIC_SUCCESS = 'UPDATE_USERPIC_SUCCESS'
export const UPDATE_USERPIC_FAILURE = 'UPDATE_USERPIC_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchUserRequest = bool => ({type: FETCH_USER_REQUEST, isLoading: bool})
export const onFetchUserSuccess = json => ({type: FETCH_USER_SUCCESS, user: json})
export const onFetchUserFailure = bool => ({type: FETCH_USER_FAILURE, isErrored: bool})

export const onUpdateUserRequest = () => ({type: UPDATE_USER_REQUEST})
export const onUpdateUserSuccess = () => ({type: UPDATE_USER_SUCCESS})
export const onUpdateUserFailure = () => ({type: UPDATE_USER_FAILURE})

export const onUpdateUserpicRequest = () => ({type: UPDATE_USERPIC_REQUEST})
export const onUpdateUserpicSuccess = () => ({type: UPDATE_USERPIC_SUCCESS})
export const onUpdateUserpicFailure = () => ({type: UPDATE_USERPIC_FAILURE})

export const fetchUser = () => {
  const url = `${scope}private/user`

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchUserRequest(true))
    api(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
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

export const updateUser = (form, cb) => {
  const formData = new FormData(form)
  const url = `${scope}private/user/edit`

  return (dispatch) => {
    dispatch(onUpdateUserRequest(true))

    api(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${getToken()}`
      },
      body: new URLSearchParams(formData),
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            //dispatch(signOut())
            //browserHistory.push('/')
          }

          throw Error(response.statusText)
        }

        dispatch(onUpdateUserRequest(false))

        return response
      })
      .then(response => {
        dispatch(onUpdateUserSuccess())
        cb()
      })
      .catch(error => {
        console.error(error)
        dispatch(onUpdateUserFailure(true))
      })
  }
}

export const updateUserpic = file => {
  const url = `${rootUrl}${scope}private/uploadFile`
  const formData = new FormData()

  formData.append('file', file)

  return (dispatch) => {
    dispatch(onUpdateUserpicRequest(true))

    axios.post(
      url,
      formData, {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      }
    )
    .then(response => {
      switch (response.status) {
        case 200:
          if (response.data.success) {
            dispatch(onUpdateUserpicRequest(false))
          } else {
            throw Error(response.data.message)
          }
          break
        case 401:
          dispatch(signOut())
          browserHistory.push('/')
          break
        default:
          throw Error(response.statusText)
      }

      return response
    })
    .catch(error => {
      console.error(error)
      dispatch(Notifications.error({
        title: 'Не удалось загрузить фотографию.',
        message: error.message,
        position: 'bl',
      }))
      dispatch(onUpdateUserpicFailure(true))
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

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
