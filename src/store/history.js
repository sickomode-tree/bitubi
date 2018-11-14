import api, {scope} from 'utils/fetch'
import { checkAuthorized, getToken, isModerator } from 'utils/auth'

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

export const onFetchHistoryRequest = bool => ({ type: FETCH_HISTORY_REQUEST, isLoading: bool })
export const onFetchHistorySuccess = json => ({ type: FETCH_HISTORY_SUCCESS, items: json })
export const onFetchHistoryFailure = bool => ({ type: FETCH_HISTORY_FAILURE, isErrored: bool })

export const onSaveToHistoryRequest = () => ({ type: SAVE_TO_HISTORY_REQUEST })
export const onSaveToHistorySuccess = () => ({ type: SAVE_TO_HISTORY_SUCCESS })
export const onSaveToHistoryFailure = bool => ({ type: SAVE_TO_HISTORY_FAILURE, isErrored: bool })

export function fetchHistory () {
  const url = `${scope}private/user/history`
  let token = null

  return (dispatch, getState) => {
    dispatch(onFetchHistoryRequest(true))

    token = getState().auth.token

    api(url, {
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

        return response
      })
      .then(response => response.json())
      .then(json => {
        let cards = []

        if (!isModerator) {
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
        } else {
          cards = json
        }

        dispatch(onFetchHistorySuccess(cards))
      })
      .catch(error => {
        console.error(error)
        dispatch(onFetchHistoryFailure(true))
      })
  }
}

export function saveToHistory (id) {
  const url = `${scope}private/user/history`
  const formData = new FormData()
  let token = null

  formData.append('id', id)

  return (dispatch, getState) => {
    dispatch(onSaveToHistoryRequest())

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

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSaveToHistorySuccess()))
      .catch(error => {
        console.error(error)
        dispatch(onSaveToHistoryFailure(true))
      })
  }
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
}

export default function historyReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
