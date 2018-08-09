// ------------------------------------
// Constants
// ------------------------------------
export const FAVOURITES_IS_LOADING = 'FAVOURITES_IS_LOADING'
export const FAVOURITES_FETCH_SUCCESS = 'FAVOURITES_FETCH_SUCCESS'
export const FAVOURITES_FETCH_ERROR = 'FAVOURITES_FETCH_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: FAVOURITES_IS_LOADING,
    isLoading: bool,
  };
}

export function onFetchSuccess(json) {
  return {
    type: FAVOURITES_FETCH_SUCCESS,
    items: json,
  };
}

export function onFetchError(bool) {
  return {
    type: FAVOURITES_FETCH_ERROR,
    hasErrored: bool,
  };
}

export function fetchFavourites() {
  const url = '/test/private/user/favourites'

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
      .then(json => {
        let cards = []

        json.forEach(item => {
          if (!_.isNil(item.categoryObjects)) {
            item.categoryObjects.forEach(categoryObject => {
              let category = categoryObject.parent

              categoryObject.children.forEach(subcategory => {
                let card = _.clone(item, true)
                card.category = category
                card.subcategory = subcategory
                // delete card.categoryObjects
                cards.push(card)
              })
            })
          } else {
            cards.push(item)
          }
        })

        return dispatch(onFetchSuccess(cards))
      })
      .catch(error => dispatch(onFetchError(true)))
  };
}

export const actions = {
  fetchFavourites,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FAVOURITES_FETCH_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [FAVOURITES_IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [FAVOURITES_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    items: action.items,
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

export default function favourtitesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
