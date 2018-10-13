import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Card.scss'

const Card = props => (
  <a
    onClick={props.onClick}
    style={props.style}
    className={
      classNames(
        'Card',
        {'Card--green': props.color === 'green'},
        {'Card--center': props.align === 'center'}
      )
    }
  >
    {props.children}
  </a>
)

Card.propTypes = {
  color: PropTypes.string,
  align: PropTypes.string,
  onClick: PropTypes.func,
}

export default Card
