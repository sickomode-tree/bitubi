import {browserHistory} from 'react-router'
import {signOut} from 'store/auth'
import api, {scope} from 'utils/fetch'
import { checkAuthorized, getToken, isModerator } from 'utils/auth'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_FAVOURITES_REQUEST = 'FETCH_FAVOURITES_REQUEST'
export const FETCH_FAVOURITES_SUCCESS = 'FETCH_FAVOURITES_SUCCESS'
export const FETCH_FAVOURITES_FAILURE = 'FETCH_FAVOURITES_FAILURE'

export const SAVE_TO_FAVOURITES_REQUEST = 'SAVE_TO_FAVOURITES_REQUEST'
export const SAVE_TO_FAVOURITES_SUCCESS = 'SAVE_TO_FAVOURITES_SUCCESS'
export const SAVE_TO_FAVOURITES_FAILURE = 'SAVE_TO_FAVOURITES_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const onFetchFavouritesRequest = bool => ({ type: FETCH_FAVOURITES_REQUEST, isLoading: bool })
export const onFetchFavouritesSuccess = json => ({ type: FETCH_FAVOURITES_SUCCESS, items: json })
export const onFetchFavouritesFailure = bool => ({ type: FETCH_FAVOURITES_FAILURE, isErrored: bool })

export const onSaveToFavouritesRequest = () => ({ type: SAVE_TO_FAVOURITES_REQUEST })
export const onSaveToFavouritesSuccess = () => ({ type: SAVE_TO_FAVOURITES_SUCCESS })
export const onSaveToFavouritesFailure = bool => ({ type: SAVE_TO_FAVOURITES_FAILURE, isErrored: bool })

export function fetchFavourites () {
  const url = `${scope}private/user/favourites`
  let token = null

  return (dispatch, getState) => {
    dispatch(onFetchFavouritesRequest(true))

    token = getState().auth.token

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

        dispatch(onFetchFavouritesRequest(false))

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

        dispatch(onFetchFavouritesSuccess(cards))
      })
      .catch(error => {
        console.error(error)
        dispatch(onFetchFavouritesFailure(true))
      })
  }
}

export function saveToFavourites (id) {
  const formData = new FormData()
  const url = `${scope}private/user/favourites`
  let token = null

  formData.append('id', id)

  return (dispatch, getState) => {
    dispatch(onSaveToFavouritesRequest())

    token = getState().auth.token

    return api(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
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

        return response
      })
      .then(response => response.json())
      .then(json => dispatch(onSaveToFavouritesSuccess()))
      .catch(error => {
        console.error(error)
        dispatch(onSaveToFavouritesFailure(true))
      })
  }
}

export const actions = {
  fetchFavourites,
  saveToFavourites,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_FAVOURITES_REQUEST]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FETCH_FAVOURITES_SUCCESS]: (state, action) => ({
    ...state,
    items: action.items,
    isLoading: false,
  }),
  [FETCH_FAVOURITES_FAILURE]: (state, action) => ({
    ...state,
    isErrored: action.isErrored,
    isLoading: false,
  }),
  [SAVE_TO_FAVOURITES_FAILURE]: (state, action) => ({
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

export default function favouritesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
