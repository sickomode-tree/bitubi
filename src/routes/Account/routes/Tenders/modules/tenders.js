import {getToken, getUserType} from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const TENDERS_IS_FETCHING = 'TENDERS_IS_FETCHING'
export const TENDERS_FETCH_SUCCESS = 'TENDERS_FETCH_SUCCESS'
export const TENDERS_FETCH_ERROR = 'TENDERS_FETCH_ERROR'

export const TENDER_SAVE_SUCCESS = 'TENDER_SAVE_SUCCESS'

export const TENDER_IS_DELETING = 'TENDER_IS_DELETING'
export const TENDER_DELETE_SUCCESS = 'TENDER_DELETE_SUCCESS'

export const TENDER_IS_TOGGLING = 'TENDER_IS_TOGGLING'
export const TENDER_TOGGLE_SUCCESS = 'TENDER_TOGGLE_SUCCESS'

export const TENDER_SAVE_TO_FAVOURITES = 'TENDER_SAVE_TO_FAVOURITES'

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

export function onToggleTenderStart(bool) {
  return {
    type: TENDER_IS_TOGGLING,
    isToggling: bool,
  };
}

export function onToggleTenderSuccess() {
  fetchTenders()

  return {
    type: TENDER_TOGGLE_SUCCESS,
  };
}

export function onsaveTenderToFavouritesSuccess(id) {
  return {
    type: TENDER_SAVE_TO_FAVOURITES,
    id: id,
  }
}

export function fetchTenders() {
  const urlByUserTypeMap = {
    customer: '/test/private/user/tenders',
    provider: '/test/private/tenders',
  }
  const userType = getUserType()
  const url = urlByUserTypeMap[userType]

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

export function toggleTender(id) {
  const formData = new FormData()
  const url = '/test/private/user/toggleActiveTender'

  formData.append('id', id)

  return (dispatch) => {
    dispatch(onToggleTenderStart(true))

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

        dispatch(onToggleTenderStart(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onToggleTenderSuccess()))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export function saveTenderToFavourites(id) {
  const formData = new FormData()
  const url = '/test/private/user/favourites'

  formData.append('id', id)

  return (dispatch) => {
    // dispatch(onFetchStart(true))

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
      .then(json => dispatch(onsaveTenderToFavouritesSuccess(id)))
      .catch(error => dispatch(onFetchError(true)))
  };
}

export const actions = {
  fetchTenders,
  saveTender,
  deleteTender,
  toggleTender,
  saveTenderToFavourites,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TENDERS_FETCH_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
    isLoading: false,
  }),
  [TENDERS_IS_FETCHING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [TENDERS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    items: action.items,
    isLoading: false,
  }),
  [TENDER_IS_DELETING]: (state, action) => ({
    ...state,
    isDeleting: action.isDeleting
  }),
  [TENDER_IS_TOGGLING]: (state, action) => ({
    ...state,
    isToggling: action.isToggling
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
