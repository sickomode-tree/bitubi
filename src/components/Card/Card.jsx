import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Card.scss'
import {rootUrl} from 'utils/fetch'

const Card = props => (
  <a
    onClick={props.onClick}
    style={props.style}
    className={
      classNames(
        'Card',
        {'Card--green': props.color === 'green'},
        {'Card--inverted': props.inverted},
        {'Card--center': props.align === 'center'},
        {'Card--link': props.onClick}
      )
    }
  >
    {
      props.imagePath &&
      <img src={rootUrl + props.imagePath} alt={props.title} className={'Card__Image'}/>
    }
    {props.children}
  </a>
)

Card.propTypes = {
  color: PropTypes.string,
  align: PropTypes.string,
  onClick: PropTypes.func,
}

export default Card
