import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Menu, Modal} from 'semantic-ui-react'

class SignUpModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    categories: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    handleSignUp: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchSubcategories: PropTypes.func.isRequired,
  }

  state = {
    category: null,
    subcategory: null,
    city: null,
    selectedUserType: 'customer',
  }

  componentDidMount() {
    const {fetchCategories, fetchSubcategories, fetchCities} = this.props

    fetchCategories()
    fetchSubcategories()
    fetchCities()
  }

  render() {
    const {categories, subcategories, cities, trigger} = this.props
    const {category, subcategory, city, selectedUserType} = this.state

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
              <Form.Group>
                <Form.Select
                  name='city' label='Город'
                  options={cities.map(city => ({
                    value: city.id,
                    text: city.name,
                  }))}
                  value={city}
                  placeholder='Город' width={8} required onChange={this.handleSelectChange.bind(this)}
                />
                <input type='hidden' name='city' value={city}/>
                <Form.Input name='address' label='Адрес' placeholder='Адрес' type='text' required width={8}/>
              </Form.Group>
            }
            {
              selectedUserType === 'provider' &&
              <Form.Input name='phoneNumber' label='Телефон' placeholder='Телефон' type='text' required/>
            }
            {
              selectedUserType === 'provider' &&
              <Form.Input name='url' label='Сайт' placeholder='http://example.com' type='text'/>
            }
            {
              selectedUserType === 'provider' &&
              <Form.Group>
                <Form.Select name='category' label='Категория'
                             options={categories.map(category => ({
                               value: category.id,
                               text: category.title,
                             }))}
                             value={category}
                             placeholder='Категория' width={8} required onChange={this.handleSelectChange.bind(this)}/>
                <Form.Select name='subcategory' label='Подкатегория'
                             options={subcategories.map(subcategory => ({
                               value: subcategory.id,
                               text: subcategory.title,
                               parent: subcategory.parent.id,
                             })).filter(subcategory => subcategory.parent === category)}
                             value={subcategory}
                             placeholder='Подкатегория' width={8} required onChange={this.handleSelectChange.bind(this)}
                             disabled={_.isNil(category)}/>
                <input type='hidden' name='subcategory' value={subcategory}/>
              </Form.Group>
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

  handleSelectChange(event, field) {
    this.setState({[field.name]: field.value})
  }

  handleSubmit(event) {
    const {handleSignUp} = this.props
    const form = event.target;

    handleSignUp(form);
  }
}

export default SignUpModal
