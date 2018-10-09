import {Authorization} from 'components/Authorization/Authorization'
import {customerUserType, providerUserType, guestUserType, moderatorUserType} from 'utils/auth'

export default (store) => ({
  path: 'policy',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      const Policy = require('./containers/PolicyContainer').default
      // const homeReducer = require('./modules/home').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'home', homeReducer })

      /*  Return getComponent   */
      cb(null, Authorization(Policy, [customerUserType, providerUserType, moderatorUserType, guestUserType]))

      /* Webpack named bundle   */
    }, 'policy')
  }
})
