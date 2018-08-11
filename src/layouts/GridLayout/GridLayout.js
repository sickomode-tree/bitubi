import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import {Container, Segment} from 'semantic-ui-react'
import {sendSingInRequest, signOut} from 'store/auth';

const DefaultLayout = ({children, isAuthorized, sendSingInRequest, signOut}) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <Header
      isAuthorized={isAuthorized}
      sendSingInRequest={sendSingInRequest}
      signOut={signOut}
    />
    <Container style={{display: 'flex'}}>
      {children}
    </Container>
  </div>
)

DefaultLayout.propTypes = {
  children: PropTypes.node,
  isAuthorized: PropTypes.bool.isRequired,
  sendSingInRequest: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  sendSingInRequest,
  signOut,
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.auth.isAuthorized,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
