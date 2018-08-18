import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Notifications from 'react-notification-system-redux';
import Header from 'components/Header/Header'
import {Container, Dimmer, Loader, Portal} from 'semantic-ui-react'
import {fetchCities} from 'store/cities'
import {fetchCategories} from 'store/categories'
import {sendSingInRequest, sendSingUpRequest, signOut} from 'store/auth'
import {changeFilterValue, changeSearchTerm, resetFilter} from 'store/filter'
import {fetchProducts} from 'store/products'

class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    cards: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    notifications: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    isErrored: PropTypes.bool,
    changeFilterValue: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    sendSingInRequest: PropTypes.func.isRequired,
    sendSingUpRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {
      children, cards, categories, cities, filters, searchTerm, notifications,
      isAuthorized, isLoading, isErrored,
      fetchCategories, fetchCities, fetchProducts,
      changeSearchTerm, changeFilterValue, resetFilter,
      sendSingInRequest, sendSingUpRequest, signOut,
    } = this.props

    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Header
          cards={cards}
          categories={categories}
          cities={cities}
          filters={filters}
          isAuthorized={isAuthorized}
          searchTerm={searchTerm}
          changeFilterValue={changeFilterValue}
          changeSearchTerm={changeSearchTerm}
          resetFilter={resetFilter}
          fetchCategories={fetchCategories}
          fetchCities={fetchCities}
          fetchProducts={fetchProducts}
          sendSingInRequest={sendSingInRequest}
          sendSingUpRequest={sendSingUpRequest}
          signOut={signOut}
        />
        <Container style={{display: 'flex', height: '100%'}}>
          {children}
          <Dimmer active={isLoading} inverted>
            <Loader>Загрузка...</Loader>
          </Dimmer>
          <Portal open>
            <Notifications
              notifications={notifications}
            />
          </Portal>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.products.products,
    categories: state.categories.categories,
    cities: state.cities.cities,
    filters: state.filter.filters,
    notifications: state.notifications,
    isAuthorized: state.auth.isAuthorized,
    searchTerm: state.filter.searchTerm,
    isLoading: getLoadingState(state),
  }
};

const mapDispatchToProps = {
  changeFilterValue,
  changeSearchTerm,
  fetchProducts,
  fetchCategories,
  fetchCities,
  resetFilter,
  sendSingUpRequest,
  sendSingInRequest,
  signOut,
};

function getLoadingState(obj) {
  const isLoading = _.some(obj, {isLoading: true})

  return isLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
