import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import { Container, Segment } from 'semantic-ui-react'
import { sendAuthRequest, signOut } from 'store/auth';
import './DefaultLayout.scss'

const DefaultLayout = ({ children, isAuthorized, sendAuthRequest, signOut }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Header
      isAuthorized={isAuthorized}
      sendAuthRequest={sendAuthRequest}
      signOut={signOut}
    />
    <Container className='d-flex' style={{overflow: 'hidden'}}>
      {children}
    </Container>
  </div>
)

DefaultLayout.propTypes = {
  children: PropTypes.node,
  isAuthorized: PropTypes.bool.isRequired,
  sendAuthRequest: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  sendAuthRequest,
  signOut,
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.auth.isAuthorized,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
