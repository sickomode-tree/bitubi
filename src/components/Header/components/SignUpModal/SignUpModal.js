import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Modal } from 'semantic-ui-react'

class SignUpModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    handleSignUp: PropTypes.func.isRequired,
  }

  render() {
    const { trigger } = this.props

    return (
      <Modal
        trigger={trigger || <Button basic color='green'>Зарегистрироваться</Button>}
        size='tiny'
        className='scrolling'
        style={{height: 'fit-content'}}
      >
        <Modal.Header>Зарегистрироваться</Modal.Header>
        <Modal.Content>
          <Form
            id='registerForm'
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Group>
              <Form.Input name='firstName' label='Имя' placeholder='Имя' width={8} required/>
              <Form.Input name='lastName' label='Фамилия' placeholder='Фамилия' width={8} required/>
            </Form.Group>
            <Form.Input name='login' label='Логин' placeholder='Логин' required/>
            <Form.Input name='password' label='Пароль' placeholder='Пароль' type='password' required/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='registerForm' icon='checkmark' labelPosition='right' content='Далее'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleSubmit(event) {
    const { handleSignUp } = this.props
    const form = event.target;
debugger;
    handleSignUp(form);
  }
}

export default SignUpModal
