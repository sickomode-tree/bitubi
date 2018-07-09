import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'semantic-ui-react'

export default class ProductModal extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    trigger: PropTypes.node,
  }

  render() {
    const {card, trigger} = this.props

    return (
      <Modal
        trigger={trigger || <a className='item'>Продукт</a>}
        size='tiny'
        className='scrolling'
        style={{height: 'fit-content'}}
      >
        <Modal.Header>{card.provider.name}</Modal.Header>
        <Modal.Content>
          <p>{card.provider.city}</p>
          <p>{card.description}</p>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
      </Modal>
    )
  }
}
