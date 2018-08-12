// ------------------------------------
// Constants
// ------------------------------------

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'

// ------------------------------------
// Actions
// ------------------------------------

export const onShowNotification = notification => ({type: SHOW_NOTIFICATION, notification: notification})

export function showNotification(config) {
  return (dispatch, getState) => {
    const notification = {
      id: getState().notifications.items.length,
      text: config.text || '',
      type: config.type || 'info',
    }

    dispatch(onShowNotification(notification))
  }
}

export const actions = {
  showNotification,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SHOW_NOTIFICATION]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      action.notification,
    ]
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  items: [],
};

export default function notificationsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
