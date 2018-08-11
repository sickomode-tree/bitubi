// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST'
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS'
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE'

export const SAVE_TO_HISTORY_REQUEST = 'SAVE_TO_HISTORY_REQUEST'
export const SAVE_TO_HISTORY_SUCCESS = 'SAVE_TO_HISTORY_SUCCESS'
export const SAVE_TO_HISTORY_FAILURE = 'SAVE_TO_HISTORY_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchHistoryRequest = bool => ({type: FETCH_HISTORY_REQUEST, isLoading: bool})
export const onFetchHistorySuccess = json => ({type: FETCH_HISTORY_SUCCESS, items: json})
export const onFetchHistoryFailure = bool => ({type: FETCH_HISTORY_FAILURE, isErrored: bool})

export const onSaveToHistoryRequest = () => ({type: SAVE_TO_HISTORY_REQUEST})
export const onSaveToHistorySuccess = () => ({type: SAVE_TO_HISTORY_SUCCESS})
export const onSaveToHistoryFailure = bool => ({type: SAVE_TO_HISTORY_FAILURE, isErrored: bool})

export function fetchHistory() {
  const url = '/test/private/user/history'
  let token = null

  return (dispatch, getState) => {
    dispatch(onFetchHistoryRequest(true));

    token = getState().auth.token

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

        dispatch(onFetchHistoryRequest(false))

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchHistorySuccess(json)))
      .catch(error => dispatch(onFetchHistoryFailure(true)))
  };
}

export function saveToHistory(id) {
  const url = '/test/private/user/history'
  const formData = new FormData()
  let token = null

  formData.append('id', id)

  return (dispatch, getState) => {
    dispatch(onSaveToHistoryRequest())

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

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSaveToHistorySuccess()))
      .catch(error => dispatch(onSaveToHistoryFailure(true)))
  };
}

export const actions = {
  fetchHistory,
  saveToHistory,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_HISTORY_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_HISTORY_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    items: action.items,
  }),
  [FETCH_HISTORY_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isErrored: action.isErrored,
  }),
  [SAVE_TO_HISTORY_FAILURE]: (state, action) => ({
    ...state,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  items: [],
  isLoading: false,
  isErrored: false,
};

export default function historyReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
