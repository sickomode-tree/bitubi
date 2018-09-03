import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Button, Card, Icon, Image, Modal, Progress } from 'semantic-ui-react'
import IconList from 'components/IconList/IconList'
import Tag from 'components/Tag/Tag'
import moment from 'moment/moment'
import { isCustomer, isProvider, isModerator } from 'utils/auth'

export default class TenderCard extends Component {
  static propTypes = {
    tender: PropTypes.object.isRequired,
    style: PropTypes.object,
    saveToHistory: PropTypes.func,
    saveToFavourites: PropTypes.func,
    verifyingTender: PropTypes.func,
    verifiedTender: PropTypes.func,
    onClose: PropTypes.func,
  }

  state = {
    favourite: this.props.tender.favourite || false,
    verified: this.props.tender.verified || null,
    verifying: this.props.tender.verifying || null,
  }

  render () {
    const { tender, style, saveToHistory, onClose } = this.props
    const { favourite, verifying } = this.state

    return (
      <Modal
        size='large'
        dimmer='blurring'
        onOpen={() => (isProvider && !_.isNil(saveToHistory)) ? saveToHistory(tender.id) : null}
        onClose={!_.isNil(onClose) ? onClose : null}
        trigger={
          <Card
            fluid
            className={tender.disabled || tender.verifying ? 'disabled' : null}
            style={style || {}}
          >
            <Card.Content>
              <Card.Header>
                {tender.title}
                {tender.favourite &&
                  <i className='right floated bookmark icon red' />
                }
                {tender.verified === false &&
                  <i className='right floated bookmark icon red' />
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
                { icon: 'box', header: 'Количество, шт', description: +tender.amount },
                { icon: 'ruble', header: 'Стоимость, руб', description: +tender.price },
              ]} />
            </Card.Content>
            <Progress percent={100 - tender.totalDays / tender.daysToGo * 100} attached='bottom' />
          </Card>
        }
      >
        <Modal.Header>{tender.title}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='http://react.semantic-ui.com/images/avatar/large/daniel.jpg' />
          <Modal.Description style={{ width: '100%' }}>
            {tender.category && <Tag icon='tags' content={tender.category.title} />}
            {tender.subcategory && <Tag icon='tag' content={tender.subcategory.title} />}
            {tender.subcategory && <br />}

            <IconList
              data={[
                { icon: 'building', header: 'Город', description: tender.city.name },
                { icon: 'map marker alternate', header: 'Район', description: tender.district ? tender.district.name : '' },
                { icon: 'calendar', header: 'Ожидаемая дата', description: moment(tender.expectedDate).format('DD.MM.YYYY') },
                { icon: 'box', header: 'Количество, шт', description: +tender.amount },
                { icon: 'ruble', header: 'Стоимость, руб', description: +tender.price },
                { icon: 'comment', header: 'Комментарий', description: tender.comment },
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
        {
          isModerator &&
          <Modal.Actions>
            <Button
              basic={!verifying} icon={!verifying ? 'play' : 'pause'}
              content={!verifying ? 'Приступить' : 'Остановить'}
              onClick={this.toggleVerifyingState.bind(this)}
            />
            {
              verifying &&
              <Button
                icon='ban'
                color='red'
                content='Отклонить'
                onClick={this.toggleVerifiedState.bind(this, false)}
              />
            }
            {
              verifying &&
              <Button
                icon='check'
                color='green'
                content='Одобрить'
                onClick={this.toggleVerifiedState.bind(this, true)}
              />
            }
          </Modal.Actions>
        }
      </Modal>
    )
  }

  toggleFavouriteState () {
    const { tender, saveToFavourites, fetchTenders } = this.props
    const { favourite } = this.state

    this.setState({ favourite: !favourite })
    saveToFavourites(tender.id)
  }

  toggleVerifyingState () {
    const { tender, verifyingTender } = this.props
    const { verifying } = this.state

    verifyingTender(tender.id, !verifying)
    this.setState({ verifying: !verifying })
  }

  toggleVerifiedState (verified) {
    const { tender, verifiedTender } = this.props

    this.setState({ verifying: !verified })
    verifiedTender(tender.id, verified)
  }
}
