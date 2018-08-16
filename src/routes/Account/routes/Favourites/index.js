import {injectReducer} from 'store/reducers'
import {Authorization} from 'components/Authorization/Authorization'
import {customerUserType, providerUserType} from 'utils/auth'

export default (store) => ({
  path: 'favourites',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Favourites = require('./containers/FavouritesContainer').default
      const reducer = require('store/favourites').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {key: 'favourites', reducer})

      /*  Return getComponent   */
      cb(null, Authorization(Favourites, [customerUserType, providerUserType]))

      /* Webpack named bundle   */
    }, 'favourites')
  }
})
