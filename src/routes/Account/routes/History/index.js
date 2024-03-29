import { Authorization } from 'components/Authorization/Authorization'
import { customerUserType, providerUserType } from 'utils/auth'
import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'history',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const History = require('./containers/HistoryContainer').default
      const reducer = require('store/history').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'history', reducer })

      /*  Return getComponent   */
      cb(null, Authorization(History, [customerUserType, providerUserType]))

      /* Webpack named bundle   */
    }, 'history')
  }
})
