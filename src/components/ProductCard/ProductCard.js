import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Card, Icon, Image, Modal} from 'semantic-ui-react'
import {isCustomer} from 'utils/auth'
import IconList from 'components/IconList/IconList'
import Tag from 'components/Tag/Tag'

export default class ProductCard extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    style: PropTypes.object,
    saveToHistory: PropTypes.func,
    saveToFavourites: PropTypes.func,
  }

  state = {
    favourite: this.props.product.favourite || false,
  }

  render() {
    const {product, style, saveToHistory, onClose} = this.props
    const {favourite} = this.state

    return (
      <Modal
        size='large'
        dimmer='blurring'
        onOpen={() => isCustomer && !_.isNil(saveToHistory) ? saveToHistory(product.id) : null}
        onClose={!_.isNil(onClose) ? onClose : null}
        trigger={
          <Card
            style={style || {}}
            link
          >
            <Card.Content>
              <Card.Header>
                {product.provider.name}
                {product.favourite &&
                <i className='right floated bookmark icon red'></i>
                }
              </Card.Header>
              <Card.Meta>{product.provider.city.name}</Card.Meta>
              <Card.Description>
                {product.description}
              </Card.Description>
            </Card.Content>
          </Card>
        }
      >
        <Modal.Header>{product.provider.name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='http://react.semantic-ui.com/images/avatar/large/daniel.jpg'/>
          <Modal.Description style={{width: '100%'}}>
            {product.category && <Tag icon='tags' content={product.category.title}/>}
            {product.subcategory && <Tag icon='tag' content={product.subcategory.title}/>}
            {product.subcategory && <br/>}

            <IconList
              data={[
                {icon: 'handshake', header: 'Тип деятельности', description: product.provider.actionType},
                {icon: 'box', header: 'Тип поставки', description: product.deliveryType},
                {
                  icon: 'map marker alternate', header: 'Адрес', description:
                    `г. ${product.provider.city.name}, ${product.provider.district ? product.provider.district.name + ' р-н,' : '' } ${product.provider.address}`
                },
                {icon: 'phone', header: 'Телефон', description: product.provider.phoneNumber},
                {icon: 'world', header: 'Сайт', description: product.provider.url},
                {icon: 'mail', header: 'Email', description: product.provider.email},
                {icon: 'info circle', header: 'Описание', description: product.description},
              ]}
            />
          </Modal.Description>
        </Modal.Content>
        {
          isCustomer &&
          <Modal.Actions>
            <Button
              basic={!favourite} icon={`bookmark${!favourite ? ' outline' : ''}`}
              content={favourite ? 'Убрать из закладок' : 'Добавить в закладки'}
              onClick={this.toggleFavouriteState.bind(this)}
            />
          </Modal.Actions>
        }
      </Modal>
    )
  }

  toggleFavouriteState() {
    const {product, saveToFavourites} = this.props
    const {favourite} = this.state

    this.setState({favourite: !favourite})
    saveToFavourites(product.id)
  }
}
