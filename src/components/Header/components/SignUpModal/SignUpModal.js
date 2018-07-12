import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Item, Menu, Modal} from 'semantic-ui-react'

class SignUpModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    handleSignUp: PropTypes.func.isRequired,
  }

  state = {
    selectedRole: 'customer',
  }

  render() {
    const {trigger} = this.props
    const {selectedRole} = this.state
    const roles = [
      {code: 'customer', name: 'Покупатель'},
      {code: 'provider', name: 'Поставщик'},
    ]

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
            <Menu fluid size='tiny' widths={roles.length}>
              {
                roles.map(role => (
                  <Menu.Item
                    key={role.code}
                    name={role.name}
                    active={selectedRole === role.code}
                    onClick={this.handleRoleSelectChange.bind(this, role.code)}
                  />
                ))
              }
              <input type='hidden' name='role' value={selectedRole}/>
            </Menu>
            <Form.Group>
              <Form.Input name='firstName' label='Имя' placeholder='Имя' width={8} required/>
              <Form.Input name='lastName' label='Фамилия' placeholder='Фамилия' width={8} required/>
            </Form.Group>
            <Form.Input name='email' label='Email' placeholder='Email' required/>
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

  handleRoleSelectChange(role) {
    this.setState({selectedRole: role})
  }

  handleSubmit(event) {
    const {handleSignUp} = this.props
    const form = event.target;

    handleSignUp(form);
  }
}

export default SignUpModal
