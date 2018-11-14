import { connect } from 'react-redux'
import { resetFilter } from 'store/filter'
import { fetchHistory } from 'store/history'
import { saveToFavourites } from 'store/favourites'

import History from '../components/History'

const mapDispatchToProps = {
  fetchHistory,
  saveToFavourites,
  resetFilter,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  items: state.history.items,
  isLoading: state.history.isLoading,
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
