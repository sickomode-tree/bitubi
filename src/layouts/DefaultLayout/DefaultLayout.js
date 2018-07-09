import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import {Container, Segment} from 'semantic-ui-react'
import {sendAuthRequest, sendRegisterRequest, signOut} from 'store/auth';
import {changeFilterValue, changeSearchTerm, resetFilter} from 'store/filter';
import './DefaultLayout.scss'

const DefaultLayout = ({
                         children,
                         cards,
                         filters,
                         isAuthorized,
                         changeFilterValue,
                         changeSearchTerm,
                         resetFilter,
                         sendAuthRequest,
                         sendRegisterRequest,
                         signOut,
                       }) => (
  <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
    <Header
      cards={cards}
      filters={filters}
      isAuthorized={isAuthorized}
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

DefaultLayout.propTypes = {
  children: PropTypes.node,
  cards: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  changeSearchTerm: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  sendAuthRequest: PropTypes.func.isRequired,
  sendRegisterRequest: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  changeFilterValue,
  changeSearchTerm,
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
