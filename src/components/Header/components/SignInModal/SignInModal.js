import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Modal} from 'semantic-ui-react'
import EditForm from 'components/EditForm/EditForm'


class SignInModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    handleSignIn: PropTypes.func.isRequired,
  }

  render() {
    const {trigger} = this.props
    const formFields = [
      {tag: 'input', type: 'text', name: 'login', title: 'Логин', required: true, path: 'login', width: 8},
      {tag: 'input', type: 'password', name: 'password', title: 'Пароль', required: true, path: 'password', width: 8},
    ]

    return (
      <Modal
        trigger={trigger || <a className='item'>Войти</a>}
        size='tiny'
        dimmer='blurring'

      >
        <Modal.Header>Войти в систему</Modal.Header>
        <Modal.Content>
          <EditForm
            id='signInForm'
            fields={formFields}
            onSubmit={this.handleSubmit.bind(this)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='signInForm' icon='checkmark' labelPosition='left' content='Войти'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleSubmit(event) {
    const {handleSignIn} = this.props
    const form = event.target;

    handleSignIn(form);
  }
}

export default SignInModal
