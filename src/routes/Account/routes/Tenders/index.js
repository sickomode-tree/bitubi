import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'tenders',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Profile = require('./containers/TendersContainer').default
      const reducer = require('./modules/tenders').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'tenders', reducer })

      /*  Return getComponent   */
      cb(null, Profile)

    /* Webpack named bundle   */
    }, 'tenders')
  }
})
