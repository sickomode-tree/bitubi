import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Button, Image, Modal} from 'semantic-ui-react'
import IconList from 'components/IconList/IconList'
import Tag from 'components/Tag/Tag'

class TenderViewModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    tender: PropTypes.object.isRequired,
  }

  render() {
    const {tender, trigger} = this.props

    return (
      <Modal
        trigger={trigger || <Button basic>Открыть тендер</Button>}
        dimmer='blurring'
        size='large'
      >
        <Modal.Header>{tender.title}</Modal.Header>
        <Modal.Content image>
          <Modal.Description style={{width: '100%'}}>
            <Tag icon='tags' content={tender.category.title}/>
            <Tag icon='tag' content={tender.subcategory.title}/>

            <br/>

            <IconList
              data={[
                {icon: 'calendar', header: 'Дата', description: moment(tender.expectedDate).format('DD.MM.YYYY')},
                {icon: 'box', header: 'Количество, шт', description: +tender.amount},
                {icon: 'ruble', header: 'Стоимость, руб', description: +tender.price},
                {icon: 'comment', header: 'Комментарий', description: tender.comment},
              ]}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default TenderViewModal
