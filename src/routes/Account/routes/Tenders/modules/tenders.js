import {getToken} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const TENDERS_IS_FETCHING = 'TENDERS_IS_FETCHING'
export const TENDERS_FETCH_SUCCESS = 'TENDERS_FETCH_SUCCESS'
export const TENDERS_FETCH_ERROR = 'TENDERS_FETCH_ERROR'

export const TENDER_SAVE_SUCCESS = 'TENDER_SAVE_SUCCESS'

export const TENDER_IS_DELETING = 'TENDER_IS_DELETING'
export const TENDER_DELETE_SUCCESS = 'TENDER_DELETE_SUCCESS'

export const TENDER_IS_DISABLING = 'TENDER_IS_DISABLING'
export const TENDER_DISABLE_SUCCESS = 'TENDER_DISABLE_SUCCESS'

export const TENDER_IS_ENABLING = 'TENDER_IS_ENABLING'
export const TENDER_ENABLE_SUCCESS = 'TENDER_ENABLE_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: TENDERS_IS_FETCHING,
    isLoading: bool,
  };
}

export function onFetchError(bool) {
  return {
    type: TENDERS_FETCH_ERROR,
    hasErrored: bool,
  };
}

export function onFetchSuccess(json) {
  return {
    type: TENDERS_FETCH_SUCCESS,
    items: json,
  };
}

export function onSaveTenderSuccess() {
  fetchTenders()

  return {
    type: TENDER_SAVE_SUCCESS,
  };
}

export function onDeleteTenderStart(bool) {
  return {
    type: TENDER_IS_DELETING,
    isDeleting: bool,
  };
}

export function onDeleteTenderSuccess() {
  fetchTenders()

  return {
    type: TENDER_DELETE_SUCCESS,
  };
}

export function onDisableTenderStart(bool) {
  return {
    type: TENDER_IS_DISABLING,
    isDisabling: bool,
  };
}

export function onDisableTenderSuccess() {
  fetchTenders()

  return {
    type: TENDER_DISABLE_SUCCESS,
  };
}

export function onEnableTenderStart(bool) {
  return {
    type: TENDER_IS_ENABLING,
    isEnabling: bool,
  };
}

export function onEnableTenderSuccess() {
  fetchTenders()

  return {
    type: TENDER_ENABLE_SUCCESS,
  };
}

export function fetchTenders() {
  const url = '/test/private/user/tenders'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchStart(true));
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

        dispatch(onFetchStart(false))

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchSuccess(json)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function saveTender(form) {
  const formData = new FormData(form)
  const url = '/test/private/user/tenders'

  return (dispatch) => {
    dispatch(onFetchStart(true))

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

        dispatch(onFetchStart(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSaveTenderSuccess()))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function deleteTender(id) {
  const formData = new FormData()
  const url = '/test/private/user/deleteTender'

  formData.append('id', id)

  return (dispatch) => {
    dispatch(onDeleteTenderStart(true))

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

        dispatch(onDeleteTenderStart(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onDeleteTenderSuccess()))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function disableTender(id) {
  const formData = new FormData()
  const url = '/test/private/user/disableTender'

  formData.append('id', id)

  return (dispatch) => {
    dispatch(onDisableTenderStart(true))

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

        dispatch(onDisableTenderStart(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onDisableTenderSuccess()))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function enableTender(id) {
  const formData = new FormData()
  const url = '/test/private/user/enableTender'

  formData.append('id', id)

  return (dispatch) => {
    dispatch(onEnableTenderStart(true))

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

        dispatch(onEnableTenderStart(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onEnableTenderSuccess()))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export const actions = {
  fetchTenders,
  saveTender,
  deleteTender,
  disableTender,
  enableTender,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TENDERS_FETCH_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [TENDERS_IS_FETCHING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [TENDERS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    items: action.items,
  }),
  [TENDER_IS_DELETING]: (state, action) => ({
    ...state,
    isDeleting: action.isDeleting
  }),
  [TENDER_IS_DISABLING]: (state, action) => ({
    ...state,
    isDisabling: action.isDisabling
  }),
  [TENDER_IS_ENABLING]: (state, action) => ({
    ...state,
    isEnabling: action.isEnabling
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  items: [],
  isLoading: false,
  isDeleting: false,
  isDisabling: false,
  isErrored: false,
};

export default function tendersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
