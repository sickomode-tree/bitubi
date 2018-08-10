// ------------------------------------
// Constants
// ------------------------------------
export const HISTORY_IS_LOADING = 'HISTORY_IS_LOADING'
export const HISTORY_FETCH_SUCCESS = 'HISTORY_FETCH_SUCCESS'
export const HISTORY_FETCH_ERROR = 'HISTORY_FETCH_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

export function onFetchStart(bool) {
  return {
    type: HISTORY_IS_LOADING,
    isLoading: bool,
  };
}

export function onFetchSuccess(json) {
  return {
    type: HISTORY_FETCH_SUCCESS,
    items: json,
  };
}

export function onFetchError(bool) {
  return {
    type: HISTORY_FETCH_ERROR,
    hasErrored: bool,
  };
}

export function fetchHistory() {
  const url = '/test/private/user/history'

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
          if (!_.isNil(item.categories)) {
            item.categories.forEach(categoryConfig => {
              let category = categoryConfig.parent

              categoryConfig.children.forEach(subcategory => {
                let card = _.clone(item, true)
                card.category = category
                card.subcategory = subcategory
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
  fetchHistory,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HISTORY_FETCH_ERROR]: (state, action) => ({
    ...state,
    isErrored: action.hasErrored,
  }),
  [HISTORY_IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.isLoading
  }),
  [HISTORY_FETCH_SUCCESS]: (state, action) => ({
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

export default function historyReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
