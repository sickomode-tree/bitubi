import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import { loadState, saveState } from 'utils/localStorage'
import 'utils/jivosite'
import 'react-datepicker/src/stylesheets/datepicker.scss'
import './styles/main.scss'

// Store Initialization
// ------------------------------------
const store = createStore(_.merge(window.__INITIAL_STATE__, loadState()))

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  })
})

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
