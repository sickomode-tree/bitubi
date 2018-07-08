import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Modal } from 'semantic-ui-react'

class LoginModal extends Component {
  static propTypes = {
    handleSignIn: PropTypes.func.isRequired,
  }

  render() {

    return (
      <Modal
        trigger={<a className='item'>Войти</a>}
        size='tiny'
        className='scrolling'
        style={{height: 'fit-content'}}
      >
        <Modal.Header>Войти в систему</Modal.Header>
        <Modal.Content>
          <Form
            id='authForm'
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Group>
              <Form.Input name='login' label='Логин' placeholder='Логин' width={8} />
              <Form.Input name='password' label='Пароль' placeholder='Пароль' width={8} type='password' />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic content='Зарегистрироваться'/>
          <Button positive type='submit' form='authForm' icon='checkmark' labelPosition='right' content='Войти'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleSubmit(event) {
    const { handleSignIn } = this.props
    const form = event.target;

    handleSignIn(form);
  }
}

export default LoginModal
