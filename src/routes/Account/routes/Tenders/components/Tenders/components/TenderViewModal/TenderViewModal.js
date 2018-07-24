import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
        size='large'
      >
        <Modal.Header>{tender.title}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://cdn.dribbble.com/users/228922/screenshots/3293482/heijmans_2.png'/>
          <Modal.Description style={{width: '100%'}}>
            <p>
              <Tag icon='tags' content={tender.category}/>
              <Tag icon='tag' content={tender.subcategory}/>
            </p>
            <IconList
              data={[
                {icon: 'calendar', header: 'Дата', description: tender.endDate},
                {icon: 'box', header: 'Количество', description: tender.amount},
                {icon: 'ruble', header: 'Стоимость', description: tender.price},
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
