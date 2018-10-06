import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button, Modal } from 'semantic-ui-react'
import IconList from 'components/IconList/IconList'
import Tag from 'components/Tag/Tag'
import { isProvider } from 'utils/auth'

class TenderViewModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    tender: PropTypes.object.isRequired,
    saveToFavourites: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
  }

  state = {
    favourite: this.props.tender.favourite || false,
  }

  render () {
    const { tender, trigger, onOpen } = this.props
    const { favourite } = this.state

    return (
      <Modal
        trigger={trigger || <Button basic>Открыть тендер</Button>}
        dimmer='blurring'
        size='large'
        onOpen={onOpen}
        closeIcon={true}
        mountNode={document.getElementById('root')}
      >
        <Modal.Header>{tender.title}</Modal.Header>
        <Modal.Content image>
          <Modal.Description style={{ width: '100%' }}>
            <Tag icon='tags' content={tender.category.title} />
            <Tag icon='tag' content={tender.subcategory.title} />

            <br />

            <IconList
              data={[
                { icon: 'building', header: 'Город', description: tender.city.name },
                { icon: 'map marker alternate', header: 'Район', description: tender.district ? tender.district.name : '--' },
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
              basic={!favourite}
              icon={`bookmark${!favourite ? ' outline' : ''}`}
              content={favourite ? 'Убрать из закладок' : 'Добавить в закладки'}
              onClick={this.toggleFavouriteState.bind(this)}
            />
          </Modal.Actions>
        }
      </Modal>
    )
  }

  toggleFavouriteState () {
    const { tender, saveToFavourites } = this.props
    const { favourite } = this.state

    this.setState({ favourite: !favourite })
    saveToFavourites(tender.id)
  }
}

export default TenderViewModal
