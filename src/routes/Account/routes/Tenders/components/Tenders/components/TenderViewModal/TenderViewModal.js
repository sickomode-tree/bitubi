import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon, Image, Label, List, Modal} from 'semantic-ui-react'

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
        size='wide'
        className='scrolling'
        style={{height: 'fit-content'}}
      >
        <Modal.Header>{tender.title}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://cdn.dribbble.com/users/228922/screenshots/3293482/heijmans_2.png'/>
          <Modal.Description style={{width: '100%'}}>
            <p>
              <Label>
                <Icon name='tags' /> {tender.category}
              </Label>
              <Label>
                <Icon name='tag' /> {tender.subcategory}
              </Label>
            </p>
            <List divided relaxed>
              <List.Item>
                <List.Icon name='ruble' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>Стоимость</List.Header>
                  <List.Description>{tender.price}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='box' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>Количество</List.Header>
                  <List.Description>{tender.amount}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='comment' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>Комментарий</List.Header>
                  <List.Description>{tender.comment}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='calendar' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>Дата</List.Header>
                  <List.Description>{tender.endDate}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default TenderViewModal
