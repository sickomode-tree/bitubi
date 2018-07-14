import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Dropdown, Form, Modal, TextArea} from 'semantic-ui-react'

class TenderFormModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    saveTender: PropTypes.func.isRequired,
  }

  render() {
    const {trigger} = this.props

    return (
      <Modal
        trigger={trigger || <Button basic color='green'>Создать тендер</Button>}
        size='tiny'
        className='scrolling'
        style={{height: 'fit-content'}}
      >
        <Modal.Header>Создать тендер</Modal.Header>
        <Modal.Content>
          <Form
            id='tenderForm'
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Input name='title' label='Название' placeholder='Название' required/>
            <Form.Input name='amount' label='Количество' placeholder='Количество' type='number' required/>
            <Form.Group>
              <Form.Select label='Категория' options={[]} placeholder='Категория' width={8} required/>
              <Form.Select label='Подкатегория' options={[]} placeholder='Подкатегория' width={8} required/>
            </Form.Group>
            <Form.Group>
              <Form.Input name='price' label='Ожидаемая цена' placeholder='Ожидаемая цена' width={8} type='number'/>
              <Form.Input name='endDate' label='Ожидаемая дата' placeholder='Ожидаемая дата' width={8}/>
            </Form.Group>
            <Form.Field
              control={TextArea}
              label='Комментарий'
              placeholder='Комментарий'
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='tenderForm' icon='checkmark' labelPosition='right' content='Далее'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleSubmit(event) {
    const {saveTender} = this.props
    const form = event.target;

    saveTender(form);
  }
}

export default TenderFormModal
