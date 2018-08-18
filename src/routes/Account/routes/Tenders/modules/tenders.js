import {getToken, getUserType} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_TENDERS_REQUEST = 'FETCH_TENDERS_REQUEST'
export const FETCH_TENDERS_SUCCESS = 'FETCH_TENDERS_SUCCESS'
export const FETCH_TENDERS_FAILURE = 'FETCH_TENDERS_FAILURE'

export const SAVE_TENDER_REQUEST = 'SAVE_TENDER_REQUEST'
export const SAVE_TENDER_SUCCESS = 'SAVE_TENDER_SUCCESS'
export const SAVE_TENDER_FAILURE = 'SAVE_TENDER_FAILURE'

export const DELETE_TENDER_REQUEST = 'DELETE_TENDER_REQUEST'
export const DELETE_TENDER_SUCCESS = 'DELETE_TENDER_SUCCESS'
export const DELETE_TENDER_FAILURE = 'DELETE_TENDER_FAILURE'

export const TOGGLE_TENDER_REQUEST = 'TOGGLE_TENDER_REQUEST'
export const TOGGLE_TENDER_SUCCESS = 'TOGGLE_TENDER_SUCCESS'
export const TOGGLE_TENDER_FAILURE = 'TOGGLE_TENDER_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchTendersRequest = bool => ({type: FETCH_TENDERS_REQUEST, isLoading: bool})
export const onFetchTendersSuccess = json => ({type: FETCH_TENDERS_SUCCESS, items: json})
export const onFetchTendersFailure = bool => ({type: FETCH_TENDERS_FAILURE, isErrored: bool})

export const onSaveTenderRequest   = bool => ({type: SAVE_TENDER_REQUEST, isSaving: bool})
export const onSaveTenderSuccess   = ()   => ({type: SAVE_TENDER_SUCCESS})
export const onSaveTenderFailure   = bool => ({type: SAVE_TENDER_FAILURE, isErrored: bool})

export const onDeleteTenderRequest = bool => ({type: DELETE_TENDER_REQUEST, isDeleting: bool})
export const onDeleteTenderSuccess = ()   => ({type: DELETE_TENDER_SUCCESS})
export const onDeleteTenderFailure = bool => ({type: DELETE_TENDER_FAILURE, isErrored: bool})

export const onToggleTenderRequest = bool => ({type: TOGGLE_TENDER_REQUEST, isToggling: bool})
export const onToggleTenderSuccess = ()   => ({type: TOGGLE_TENDER_SUCCESS})
export const onToggleTenderFailure = ()   => ({type: TOGGLE_TENDER_FAILURE, isErrored: bool})

// ------------------------------------
// Thunks
// ------------------------------------

export function fetchTenders() {
  const urlByUserTypeMap = {
    customer: '/test/private/user/tenders',
    provider: '/test/private/tenders',
    moderator: '/test/private/tenders',
  }
  const userType = getUserType()
  const url = urlByUserTypeMap[userType]
  let token

  return (dispatch, getState) => {
    token = getState().auth.token

    dispatch(onFetchTendersRequest(true));
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

        dispatch(onFetchTendersRequest(false))

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchTendersSuccess(json)))
      .catch(error => {
        console.error(error)
        return dispatch(onFetchTendersFailure(true))
      })
  }
}

export function saveTender(form) {
  const formData = new FormData(form)
  const url = '/test/private/user/tenders'

  return (dispatch) => {
    dispatch(onSaveTenderRequest(true))

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

        dispatch(onSaveTenderRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSaveTenderSuccess()))
      .catch(error => {
        console.error(error)
        return dispatch(onSaveTenderFailure(true))
      })
  };
}

export function deleteTender(id) {
  const formData = new FormData()
  const url = '/test/private/user/deleteTender'

  formData.append('id', id)

  return (dispatch) => {
    dispatch(onDeleteTenderRequest(true))

    return fetch(url, {
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

        dispatch(onDeleteTenderRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onDeleteTenderSuccess()))
      .catch(error => {
        console.error(error)
        dispatch(onDeleteTenderFailure(true))
      })
  };
}

export function toggleTender(id) {
  const formData = new FormData()
  const url = '/test/private/user/toggleActiveTender'

  formData.append('id', id)

  return (dispatch) => {
    dispatch(onToggleTenderRequest(true))

    return fetch(url, {
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

        dispatch(onToggleTenderRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onToggleTenderSuccess()))
      .catch(error => dispatch(onToggleTenderFailure(true)))
  };
}

export const actions = {
  fetchTenders,
  saveTender,
  deleteTender,
  toggleTender,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_TENDERS_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_TENDERS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    items: action.items,
  }),
  [FETCH_TENDERS_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isErrored: action.isErrored,
  }),
  [SAVE_TENDER_REQUEST]: (state, action) => ({
    ...state,
    isSaving: action.isSaving
  }),
  [SAVE_TENDER_SUCCESS]: (state, action) => ({
    ...state,
    isSaving: false,
  }),
  [SAVE_TENDER_FAILURE]: (state, action) => ({
    ...state,
    isSaving: false,
    isErrored: action.isErrored,
  }),
  [DELETE_TENDER_REQUEST]: (state, action) => ({
    ...state,
    isDeleting: action.isDeleting
  }),
  [SAVE_TENDER_SUCCESS]: (state, action) => ({
    ...state,
    isDeleting: false,
  }),
  [DELETE_TENDER_FAILURE]: (state, action) => ({
    ...state,
    isDeleting: false,
    isErrored: action.isErrored,
  }),
  [TOGGLE_TENDER_REQUEST]: (state, action) => ({
    ...state,
    isToggling: action.isToggling
  }),
  [TOGGLE_TENDER_SUCCESS]: (state, action) => ({
    ...state,
    isToggling: false,
  }),
  [TOGGLE_TENDER_FAILURE]: (state, action) => ({
    ...state,
    isToggling: false,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  items: [],
  isLoading: false,
  isSaving: false,
  isDeleting: false,
  isToggling: false,
  isErrored: false,
};

export default function tendersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
