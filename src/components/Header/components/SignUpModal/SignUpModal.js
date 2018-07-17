import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Item, Menu, Modal} from 'semantic-ui-react'

class SignUpModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    handleSignUp: PropTypes.func.isRequired,
  }

  state = {
    selectedUserType: 'customer',
  }

  render() {
    const {trigger} = this.props
    const {selectedUserType} = this.state
    const userTypes = [
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
            <Menu fluid size='tiny' widths={userTypes.length}>
              {
                userTypes.map(userType => (
                  <Menu.Item
                    key={userType.code}
                    name={userType.name}
                    active={selectedUserType === userType.code}
                    onClick={this.handleUserTypeSelectChange.bind(this, userType.code)}
                  />
                ))
              }
              <input type='hidden' name='userType' value={selectedUserType}/>
            </Menu>
            {
              selectedUserType === 'customer' &&
              <Form.Group>
                <Form.Input name='firstName' label='Имя' placeholder='Имя' width={8} required/>
                <Form.Input name='lastName' label='Фамилия' placeholder='Фамилия' width={8} required/>
              </Form.Group>
            }
            {
              selectedUserType === 'provider' &&
              <Form.Input name='providerName' label='Название компании' placeholder='Название компании' required/>
            }
            <Form.Input name='email' label='Email' placeholder='Email' required/>
            <Form.Input name='login' label='Логин' placeholder='Логин' required/>
            <Form.Input name='password' label='Пароль' placeholder='Пароль' type='password' required/>
            {
              selectedUserType === 'provider' &&
              <Form.Input name='address' label='Адрес' placeholder='Адрес' type='text' required/>
            }
            {
              selectedUserType === 'provider' &&
              <Form.Input name='phoneNumber' label='Телефон' placeholder='Телефон' type='text' required/>
            }
            {
              selectedUserType === 'provider' &&
              <Form.Input name='url' label='Сайт' placeholder='http://example.com' type='text'/>
            }
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='registerForm' icon='checkmark' labelPosition='right' content='Далее'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleUserTypeSelectChange(userType) {
    this.setState({selectedUserType: userType})
  }

  handleSubmit(event) {
    const {handleSignUp} = this.props
    const form = event.target;

    handleSignUp(form);
  }
}

export default SignUpModal
