import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon, Image, Modal} from 'semantic-ui-react'
import {guestUserType, getUserType} from 'utils/auth'
import IconList from 'components/IconList/IconList'
import Tag from 'components/Tag/Tag'

export default class ProductModal extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    trigger: PropTypes.node,
    saveToHistory: PropTypes.func,
    saveToFavourites: PropTypes.func,
  }

  render() {
    const {card, trigger, saveToFavourites, saveToHistory} = this.props
    const isGuest = getUserType() === guestUserType

    return (
      <Modal
        trigger={trigger || <a className='item'>Продукт</a>}
        size='large'
        onOpen={() => !isGuest && saveToHistory(card.id)}
      >
        <Modal.Header>{card.provider.name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://cdn.dribbble.com/users/228922/screenshots/3293482/heijmans_2.png'/>
          <Modal.Description style={{width: '100%'}}>
            <p>
              <Tag icon='tags' content={card.category.title}/>
              <Tag icon='tag' content={card.subcategory.title}/>
            </p>
            <IconList
              data={[
                {icon: 'handshake', header: 'Тип деятельности', description: card.provider.actionType},
                {icon: 'box', header: 'Тип поставки', description: card.deliveryType},
                {icon: 'info circle', header: 'Описание', description: card.description},
                {icon: 'map marker alternate', header: 'Адрес', description:
                  `г. ${card.provider.city.name}, ${card.provider.district ? card.provider.district.name + ' р-н,' : '' } ${card.provider.address}`
                },
                {icon: 'phone', header: 'Телефон', description: card.provider.phoneNumber},
                {icon: 'world', header: 'Сайт', description: card.provider.url},
                {icon: 'mail', header: 'Email', description: card.provider.email},
              ]}
            />
          </Modal.Description>
        </Modal.Content>
        {
          !isGuest &&
          <Modal.Actions>
            <Button
              basic={!card.favourite} icon={`star${!card.favourite ? ' outline' : ''}`}
              content={card.favourite ? 'Убрать из закладок' : 'Сохранить'}
              color={card.favourite ? 'yellow' : 'twitter'}
              onClick={() => saveToFavourites(card.id)}
            />
          </Modal.Actions>
        }
      </Modal>
    )
  }
}
