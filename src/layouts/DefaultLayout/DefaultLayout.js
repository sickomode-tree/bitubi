import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import {Container} from 'semantic-ui-react'
import {sendAuthRequest, sendRegisterRequest, signOut} from 'store/auth'
import {changeFilterValue, changeSearchTerm, resetFilter} from 'store/filter'
import {fetchProducts, fetchCategories, fetchSubcategories, fetchCities} from 'store/products'

class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    cards: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchSubcategories: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    sendAuthRequest: PropTypes.func.isRequired,
    sendRegisterRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {
      children, cards, categories, subcategories, cities, filters, searchTerm, isAuthorized,
      fetchCategories, fetchSubcategories, fetchCities, changeSearchTerm, changeFilterValue, resetFilter,
      sendAuthRequest, sendRegisterRequest, signOut,
    } = this.props

    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Header
          cards={cards}
          categories={categories}
          subcategories={subcategories}
          cities={cities}
          filters={filters}
          isAuthorized={isAuthorized}
          searchTerm={searchTerm}
          changeFilterValue={changeFilterValue}
          changeSearchTerm={changeSearchTerm}
          resetFilter={resetFilter}
          fetchCategories={fetchCategories}
          fetchCities={fetchCities}
          fetchSubcategories={fetchSubcategories}
          sendAuthRequest={sendAuthRequest}
          sendRegisterRequest={sendRegisterRequest}
          signOut={signOut}
        />
        <Container style={{display: 'flex', height: '100%'}}>
          {children}
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = {
  changeFilterValue,
  changeSearchTerm,
  fetchProducts,
  fetchCategories,
  fetchSubcategories,
  fetchCities,
  resetFilter,
  sendRegisterRequest,
  sendAuthRequest,
  signOut,
};

const mapStateToProps = (state) => {
  return {
    cards: state.products.products,
    categories: state.products.categories,
    subcategories: state.products.subcategories,
    cities: state.products.cities,
    filters: state.filter.filters,
    isAuthorized: state.auth.isAuthorized,
    searchTerm: state.filter.searchTerm,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
