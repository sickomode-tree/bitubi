import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'favourites',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Profile = require('./containers/FavouritesContainer').default
      const reducer = require('./modules/favourites').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'favourites', reducer })

      /*  Return getComponent   */
      cb(null, Profile)

    /* Webpack named bundle   */
    }, 'favourites')
  }
})
