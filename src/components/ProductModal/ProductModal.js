import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon, Modal} from 'semantic-ui-react'

export default class ProductModal extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    trigger: PropTypes.node,
    saveToHistory: PropTypes.func,
    saveToFavourites: PropTypes.func,
  }

  render() {
    const {card, trigger, saveToFavourites, saveToHistory} = this.props

    return (
      <Modal
        trigger={trigger || <a className='item'>Продукт</a>}
        size='large'
        className='scrolling'
        style={{height: 'fit-content'}}
        onOpen={() => saveToHistory(card.id)}
      >
        <Modal.Header>{card.provider.name}</Modal.Header>
        <Modal.Content>
          <p>{card.provider.city.name}</p>
          <p>{card.description}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic={!card.favourite} icon={`star${!card.favourite ? ' outline' : ''}`}
            content={card.favourite ? 'Убрать из закладок' : 'Сохранить'}
            color={card.favourite ? 'yellow' : 'twitter'}
            onClick={() => saveToFavourites(card.id)}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
