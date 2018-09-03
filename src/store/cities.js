// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST'
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS'
export const FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchCitiesRequest = bool => ({ type: FETCH_CITIES_REQUEST, isLoading: bool })
export const onFetchCitiesSuccess = json => ({ type: FETCH_CITIES_SUCCESS, cities: json })
export const onFetchCitiesFailure = bool => ({ type: FETCH_CITIES_FAILURE, isErrored: bool })

// ------------------------------------
// Thunks
// ------------------------------------

export function fetchCities () {
  const url = '/test/public/cities'

  return (dispatch, getState) => {
    const token = getState().auth.token

    dispatch(onFetchCitiesRequest(true))

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

        dispatch(onFetchCitiesRequest(false))

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onFetchCitiesSuccess(json)))
      .catch(error => {
        console.error(error)
        return dispatch(onFetchCitiesFailure(true))
      })
  }
}

export const actions = {
  fetchCities,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_CITIES_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_CITIES_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    cities: action.cities,
  }),
  [FETCH_CITIES_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    isErrored: action.isErrored,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  cities: [],
  isLoading: false,
  isErrored: false,
}

export default function citiesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
