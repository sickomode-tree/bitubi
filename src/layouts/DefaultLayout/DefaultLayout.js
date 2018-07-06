import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import { Grid } from 'semantic-ui-react'
import './DefaultLayout.scss'

export const DefaultLayout = ({ children }) => (
  <div>
    <Header />
    <div>
      {children}
    </div>
  </div>
)
DefaultLayout.propTypes = {
  children: PropTypes.node,
}

export default DefaultLayout
