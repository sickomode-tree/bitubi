import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import {Container} from 'semantic-ui-react'
import {sendAuthRequest, sendRegisterRequest, signOut} from 'store/auth'
import {changeFilterValue, changeSearchTerm, resetFilter} from 'store/filter'
import {fetchProducts} from 'store/products'

class DefaultLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    cards: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
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
      children, cards, filters, searchTerm, isAuthorized,
      changeSearchTerm, changeFilterValue, resetFilter,
      sendAuthRequest, sendRegisterRequest, signOut,
    } = this.props

    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Header
          cards={cards}
          filters={filters}
          isAuthorized={isAuthorized}
          searchTerm={searchTerm}
          changeFilterValue={changeFilterValue}
          changeSearchTerm={changeSearchTerm}
          resetFilter={resetFilter}
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
  resetFilter,
  sendRegisterRequest,
  sendAuthRequest,
  signOut,
};

const mapStateToProps = (state) => {
  return {
    cards: state.products.products,
    filters: state.filter.filters,
    isAuthorized: state.auth.isAuthorized,
    searchTerm: state.filter.searchTerm,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
