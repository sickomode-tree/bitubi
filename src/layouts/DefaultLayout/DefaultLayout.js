import React from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import './DefaultLayout.scss'

export const DefaultLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
DefaultLayout.propTypes = {
  children: PropTypes.node,
}

export default DefaultLayout
