import { connect } from 'react-redux'
import { fetchTenders, saveTender, deleteTender, toggleTender, verifyingTender, verifiedTender } from '../modules/tenders'
import { changeFilterValue, resetFilter } from 'store/filter'
import { saveToHistory } from 'store/history'
import { saveToFavourites } from 'store/favourites'
import { fetchCities } from 'store/cities'
import { fetchCategories } from 'store/categories'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Tenders from '../components/Tenders/Tenders'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  fetchCities,
  fetchCategories,
  fetchTenders,
  saveTender,
  saveToFavourites,
  saveToHistory,
  deleteTender,
  toggleTender,
  verifyingTender,
  verifiedTender,
  changeFilterValue,
  resetFilter,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  items: state.tenders.items,
  filter: state.filter,
  cities: state.cities.cities,
  categories: state.categories.categories,
  isLoading: state.tenders.isLoading,
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Tenders)
