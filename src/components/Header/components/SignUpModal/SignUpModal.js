import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Menu, Modal} from 'semantic-ui-react'
import MaskedInput from 'react-text-mask'
import _ from "lodash";

class SignUpModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    categories: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    fetchCities: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchSubcategories: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
  }

  state = {
    category: '',
    subcategory: '',
    city: '',
    district: '',
    selectedUserType: 'customer',
    phoneNumber: '',
  }

  componentDidMount() {
    const {fetchCategories, fetchSubcategories, fetchCities} = this.props

    fetchCategories()
    fetchSubcategories()
    fetchCities()
  }

  render() {
    const {categories, subcategories, cities, trigger, onClose} = this.props
    const {state} = this
    const {category, subcategory, selectedUserType, phoneNumber} = state
    const districts = state.city ? cities.find(city => city.id === state.city).districts : []

    const userTypes = [
      {code: 'customer', name: 'Покупатель'},
      {code: 'provider', name: 'Поставщик'},
    ]

    return (
      <Modal
        trigger={trigger || <Button basic color='green'>Зарегистрироваться</Button>}
        size='tiny'
        dimmer='blurring'
        onClose={onClose}
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
              <Form.Group>
                <Form.Select
                  name='city' label='Город'
                  options={cities.map(city => ({
                    value: city.id,
                    text: city.name,
                  }))}
                  value={state.city}
                  placeholder='Город' width={8} required onChange={this.handleSelectChange.bind(this)}
                />
                <input type='hidden' name='city' value={state.city}/>
                <Form.Select
                  name='district' label='Район' placeholder='Район'
                  options={districts.map(district => ({
                    value: district.id,
                    text: district.name,
                  }))}
                  disabled={_.isNil(state.city) || _.isEmpty(districts)}
                  value={state.district}
                  width={8}
                  onChange={this.handleSelectChange.bind(this)}
                />
                <input type='hidden' name='district' value={state.district}/>
              </Form.Group>
            }
            <Form.Input name='address' label='Адрес' placeholder='Адрес' type='text' required/>
            {
              selectedUserType === 'provider' &&
              <Form.Input
                label='Телефон'
                required
                children={
                  <MaskedInput
                    name='phoneNumber'
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    placeholder='(999) 999-99-99'
                    value={phoneNumber}
                    onChange={this.handleInputChange.bind(this)}
                  />
                }
              />
            }
            {
              selectedUserType === 'provider' &&
              <Form.Input name='url' label='Сайт' placeholder='http://example.com' type='text'/>
            }
            {
              selectedUserType === 'provider' &&
              <Form.Group>
                <Form.Select
                  name='category' label='Категория' placeholder='Категория'
                  options={categories.map(category => ({
                    value: category.id,
                    text: category.title,
                  }))}
                  value={category}
                  width={8} required
                  onChange={this.handleSelectChange.bind(this)}
                />
                <Form.Select
                  name='subcategory' label='Подкатегория' placeholder='Подкатегория'
                  options={subcategories.map(subcategory => ({
                    value: subcategory.id,
                    text: subcategory.title,
                    parent: subcategory.parent.id,
                  })).filter(subcategory => subcategory.parent === category)}
                  value={subcategory}
                  width={8} required disabled={_.isNil(category)}
                  onChange={this.handleSelectChange.bind(this)}
                />
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

  handleInputChange(event) {
    const field = event.target
    this.setState({[field.name]: field.value})
  }

  handleSubmit(event) {
    const {onSubmit} = this.props
    const form = event.target;

    onSubmit(form);
  }
}

export default SignUpModal
