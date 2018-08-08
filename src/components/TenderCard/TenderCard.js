import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Card, Icon, Image, Modal, Progress} from 'semantic-ui-react'
import IconList from 'components/IconList/IconList'
import Tag from 'components/Tag/Tag'
import moment from 'moment/moment'
import {isCustomer, isProvider} from 'utils/auth'

export default class TenderCard extends Component {
  static propTypes = {
    tender: PropTypes.object.isRequired,
    style: PropTypes.object,
    saveToHistory: PropTypes.func,
    saveToFavourites: PropTypes.func,
  }

  state = {
    favourite: this.props.tender.favourite || false,
  }

  render() {
    const {tender, style, saveToHistory, onClose} = this.props
    const {favourite} = this.state

    return (
      <Modal
        size='large'
        dimmer='blurring'
        onOpen={() => (isProvider && !_.isNil(saveToHistory)) ? saveToHistory(tender.id) : null}
        onClose={!_.isNil(onClose) ? onClose : null}
        trigger={
          <Card
            fluid
            className={tender.disabled ? 'disabled' : null}
            style={style || {}}
          >
            <Card.Content>
              <Card.Header>
                {tender.title}
                {tender.favourite &&
                  <i className='right floated bookmark icon red'></i>
                }
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <IconList data={[
                {
                  icon: 'calendar',
                  header: 'Ожидаемая дата',
                  description: moment(tender.expectedDate).format('DD.MM.YYYY')
                },
                {icon: 'box', header: 'Количество, шт', description: +tender.amount},
                {icon: 'ruble', header: 'Стоимость, руб', description: +tender.price},
              ]}/>
            </Card.Content>
            <Progress percent={100 - tender.totalDays / tender.daysToGo * 100} attached='bottom'/>
          </Card>
        }
      >
        <Modal.Header>{tender.title}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='http://react.semantic-ui.com/images/avatar/large/daniel.jpg'/>
          <Modal.Description style={{width: '100%'}}>
            <Tag icon='tags' content={tender.category.title}/>
            <Tag icon='tag' content={tender.subcategory.title}/>

            <br/>

            <IconList
              data={[
                {icon: 'building', header: 'Город', description: tender.city.name},
                {icon: 'map marker alternate', header: 'Район', description: tender.district.name},
                {icon: 'calendar', header: 'Ожидаемая дата', description: moment(tender.expectedDate).format('DD.MM.YYYY')},
                {icon: 'box', header: 'Количество, шт', description: +tender.amount},
                {icon: 'ruble', header: 'Стоимость, руб', description: +tender.price},
                {icon: 'comment', header: 'Комментарий', description: tender.comment},
              ]}
            />
          </Modal.Description>
        </Modal.Content>
        {
          isProvider &&
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
    const {tender, saveToFavourites} = this.props
    const {favourite} = this.state

    this.setState({favourite: !favourite})
    saveToFavourites(tender.id)
  }
}
