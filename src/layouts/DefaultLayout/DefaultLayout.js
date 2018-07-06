import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import { Container as ContainerUI, Segment as SegmentUI } from 'semantic-ui-react'
import './DefaultLayout.scss'

export const DefaultLayout = ({ children }) => (
  <div>
    <Header />
    <SegmentUI padded='very' basic>
      <ContainerUI>
        {children}
      </ContainerUI>
    </SegmentUI>
  </div>
)
DefaultLayout.propTypes = {
  children: PropTypes.node,
}

export default DefaultLayout
