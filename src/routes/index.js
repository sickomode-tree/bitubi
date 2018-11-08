import Layout from 'layouts/DefaultLayout/DefaultLayout'
import HomeRoute from './Home'
import AccountRoute from './Account'
import PolicyRoute from './Policy'
import TermsRoute from './Terms'

export default (store) => ({
  path        : '/',
  component   : Layout,
  indexRoute  : HomeRoute(store),
  childRoutes : [
    AccountRoute(store),
    PolicyRoute(store),
    TermsRoute(store),
  ]
})
