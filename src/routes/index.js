import Layout from 'layouts/DefaultLayout/DefaultLayout'
import HomeRoute from './Home'
import AccountRoute from './Account'

export default (store) => ({
  path        : '/',
  component   : Layout,
  indexRoute  : HomeRoute(store),
  childRoutes : [
    AccountRoute(store),
  ]
})
