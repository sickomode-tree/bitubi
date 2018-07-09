import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------

export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
export const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE';
export const RESET_FILTER = 'RESET_FILTER';

// ------------------------------------
// Actions
// ------------------------------------

export function onSearchTermChange(value) {
  return {
    type: CHANGE_SEARCH_TERM,
    value: value,
  }
}

export function onFilterValueChange(filter, value) {
  return {
    type: CHANGE_FILTER_VALUE,
    filter: filter,
    value: value,
  }
}

export function onFilterReset() {
  return {
    type: RESET_FILTER,
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. */

export function changeSearchTerm(value) {
  return (dispatch) => {
    dispatch(onSearchTermChange(value))
  }
}

export function changeFilterValue(filter, value) {
  return (dispatch) => {
    dispatch(onFilterValueChange(filter, value))
  }
}

export function resetFilter() {
  return (dispatch) => {
    dispatch(onFilterReset())
  }
}

export const actions = {
  changeFilterValue,
  changeSearchTerm,
  resetFilter,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_SEARCH_TERM]: (state, action) => ({
    ...state,
    searchTerm: action.value,
  }),
  [CHANGE_FILTER_VALUE]: (state, action) => ({
    ...state,
    filters: {
      ...state.filters,
      [action.filter]: action.value,
    },
  }),
  [RESET_FILTER]: (state, action) => ({
    ...state,
    filters: {},
    searchTerm: '',
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  filters: {},
  searchTerm: '',
};

export default function filterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
