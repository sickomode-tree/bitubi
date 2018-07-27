import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, Icon, Image, Modal} from 'semantic-ui-react'
import {guestUserType, getUserType} from 'utils/auth'
import IconList from 'components/IconList/IconList'
import Tag from 'components/Tag/Tag'

export default class ProductCard extends Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    style: PropTypes.object,
    saveToHistory: PropTypes.func,
    saveToFavourites: PropTypes.func,
  }

  render() {
    const {product, style, saveToHistory, saveToFavourites} = this.props
    const isGuest = getUserType() === guestUserType

    return (
      <Modal
        size='large'
        onOpen={() => !isGuest && !_.isNil(saveToHistory) && saveToHistory(product.id)}
        trigger={
          <Card
            header={product.provider.name}
            meta={product.provider.city.name}
            description={product.description}
            extra={
              product.favourite && <Icon name='star' color='yellow'/>
            }
            style={style || {}} color={product.favourite ? 'yellow' : null} link
          />
        }
      >
        <Modal.Header>{product.provider.name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://cdn.dribbble.com/users/228922/screenshots/3293482/heijmans_2.png'/>
          <Modal.Description style={{width: '100%'}}>
            <p>
              <Tag icon='tags' content={product.category.title}/>
              <Tag icon='tag' content={product.subcategory.title}/>
            </p>
            <IconList
              data={[
                {icon: 'handshake', header: 'Тип деятельности', description: product.provider.actionType},
                {icon: 'box', header: 'Тип поставки', description: product.deliveryType},
                {icon: 'info circle', header: 'Описание', description: product.description},
                {
                  icon: 'map marker alternate', header: 'Адрес', description:
                    `г. ${product.provider.city.name}, ${product.provider.district ? product.provider.district.name + ' р-н,' : '' } ${product.provider.address}`
                },
                {icon: 'phone', header: 'Телефон', description: product.provider.phoneNumber},
                {icon: 'world', header: 'Сайт', description: product.provider.url},
                {icon: 'mail', header: 'Email', description: product.provider.email},
              ]}
            />
          </Modal.Description>
        </Modal.Content>
        {
          !isGuest &&
          <Modal.Actions>
            <Button
              basic={!product.favourite} icon={`star${!product.favourite ? ' outline' : ''}`}
              content={product.favourite ? 'Убрать из закладок' : 'Сохранить'}
              color={product.favourite ? 'yellow' : 'twitter'}
              onClick={() => saveToFavourites(product.id)}
            />
          </Modal.Actions>
        }
      </Modal>
    )
  }
}
