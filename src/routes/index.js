import DefaultLayout from 'layouts/DefaultLayout/DefaultLayout'
import HomeRoute from './Home'
import AccountRoute from './Account'

export default (store) => ({
  path        : '/',
  component   : DefaultLayout,
  indexRoute  : HomeRoute(store),
  childRoutes : [
    AccountRoute(store),
  ]
});
