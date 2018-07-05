import { injectReducer } from 'store/reducers'
import Account from './components/Account'
import FavouritesRoute from "./routes/Favourites/index";
import HistoryRoute from './routes/History/index'
import ProfileRoute from './routes/Profile/index'
import TendersRoute from './routes/Tenders/index'

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
