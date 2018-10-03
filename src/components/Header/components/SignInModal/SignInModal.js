import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Image, Modal } from 'semantic-ui-react'
import EditForm from 'components/EditForm/EditForm'
import UserpicPlaceholder from './images/userpic-placeholder.jpg'

class SignInModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    handleSignIn: PropTypes.func.isRequired,
  }

  render () {
    const { trigger } = this.props
    const formFields = [
      { tag: 'input', type: 'text', name: 'login', placeholder: 'Логин', required: true, path: 'login', width: 10 },
      { tag: 'input', type: 'password', name: 'password', placeholder: 'Пароль', required: true, path: 'password', width: 10 },
    ]

    return (
      <Modal
        trigger={trigger || <Button circular className='basic green'>Войти</Button>}
        size='tiny'
        dimmer='blurring'
        closeIcon={true}
        mountNode={document.getElementById('root')}
      >
        <Modal.Header>Войти в систему</Modal.Header>
        <Modal.Content>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 30
          }}>
            <Image src={UserpicPlaceholder} size='small' circular />
          </div>
          <div>
            <EditForm
              id='signInForm'
              fields={formFields}
              centered={true}
              onSubmit={this.handleSubmit.bind(this)}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button circular basic positive type='submit' form='signInForm' content='Войти' />
        </Modal.Actions>
      </Modal>
    )
  }

  handleSubmit (event) {
    const { handleSignIn } = this.props
    const form = event.target

    handleSignIn(form)
  }
}

export default SignInModal
