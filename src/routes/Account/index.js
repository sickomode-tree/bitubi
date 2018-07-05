import { injectReducer } from 'store/reducers'
import Account from './components/Account'
import FavouritesRoute from "./routes/Favourites";
import HistoryRoute from './routes/History'
import ProfileRoute from './routes/Profile'
import TendersRoute from './routes/Tenders'

export default (store) => ({
  path : 'account',
  indexRoute  : Account,
  childRoutes : [
    FavouritesRoute(store),
    HistoryRoute(store),
    ProfileRoute(store),
    TendersRoute(store),
  ],
})
