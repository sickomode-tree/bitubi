import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import { Container as ContainerUI, Segment as SegmentUI } from 'semantic-ui-react'
import { sendAuthRequest, signOut } from 'store/auth';
import './DefaultLayout.scss'

const DefaultLayout = ({ children, isAuthorized, sendAuthRequest, signOut }) => (
  <div className='h-100'>
    <Header
      isAuthorized={isAuthorized}
      sendAuthRequest={sendAuthRequest}
      signOut={signOut}
    />
    <SegmentUI padded='very' basic className='h-100'>
      <ContainerUI>
        {children}
      </ContainerUI>
    </SegmentUI>
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
