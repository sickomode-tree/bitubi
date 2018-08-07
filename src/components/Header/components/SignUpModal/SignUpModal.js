import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {Button, Modal} from 'semantic-ui-react'
import EditForm from 'components/EditForm/EditForm'
import {getUserType} from 'utils/auth'

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
    userType: 'customer',
    phoneNumber: '',
  }

  componentDidMount() {
    const {fetchCategories, fetchCities} = this.props

    fetchCategories()
    fetchCities()
  }

  render() {
    const {categories, cities, trigger, onClose} = this.props
    const {state} = this


    const cityOptions = cities.map(city => ({value: city.id, text: city.name}))
    const cityValue = state.city
    const districts = cityValue ? cities.find(city => city.id === cityValue).districts : []
    const districtOptions = districts.map(district => ({value: district.id, text: district.name}))
    const districtValue = state.district
    const categoryOptions = categories.map(category=> ({value: category.id, text: category.title}))
    const categoryValue = state.category
    const subcategories = categoryValue ? categories.find(category => category.id === categoryValue).children : []
    const subcategoryOptions = subcategories.map(subcategory => ({value: subcategory.id, text: subcategory.title}))
    const subcategoryValue = state.subcategory

    const formFields = [
      {tag: 'menu', name: 'userType', options: [{code: 'customer', name: 'Покупатель'}, {code: 'provider', name: 'Поставщик'}], selected: state.userType, onClick: this.handleUserTypeSelectChange.bind(this)},
      {tag: 'input', type: 'text', name: 'login', title: 'Логин', required: true, width: 8},
      {tag: 'input', type: 'password', name: 'password', title: 'Пароль', required: true, width: 8},
      {
        tag: 'input',
        type: 'text',
        name: 'firstName',
        title: 'Имя',
        required: true,
        path: 'firstName',
        visible: state.userType === 'customer',
        width: 8
      },
      {
        tag: 'input',
        type: 'text',
        name: 'lastName',
        title: 'Фамилия',
        required: true,
        path: 'lastName',
        visible: state.userType === 'customer',
        width: 8,
      },
      {
        tag: 'input',
        type: 'text',
        name: 'providerName',
        title: 'Название компании',
        required: true,
        path: 'providerName',
        visible: state.userType === 'provider'
      },
      {tag: 'input', type: 'text', name: 'email', title: 'Email', required: true, path: 'email', width: 8},
      {
        tag: 'input',
        type: 'tel',
        name: 'phoneNumber',
        title: 'Телефон',
        required: state.userType === 'provider',
        path: 'phoneNumber',
        width: 8,
      },
      {
        tag: 'select',
        name: 'city',
        title: 'Город',
        required: true,
        value: cityValue,
        options: cityOptions,
        width: 8,
        onChange: this.handleSelectChange.bind(this),
      },
      {
        tag: 'select',
        name: 'district',
        title: 'Район',
        required: !_.isEmpty(districtOptions),
        value: districtValue,
        options: districtOptions,
        width: 8,
        onChange: this.handleSelectChange.bind(this),
        disabled: _.isEmpty(districtOptions)
      },
      {
        tag: 'input',
        type: 'text',
        name: 'address',
        title: 'Адрес',
        required: state.userType === 'provider',
        path: 'address'
      },
      {
        tag: 'select',
        name: 'category',
        title: 'Категория',
        required: true,
        value: categoryValue,
        options: categoryOptions,
        width: 7,
        onChange: this.handleSelectChange.bind(this),
        visible: state.userType === 'provider',
      },
      {
        tag: 'select',
        name: 'subcategory',
        title: 'Подкатегория',
        required: true,
        value: subcategoryValue,
        options: subcategoryOptions,
        width: 7,
        onChange: this.handleSelectChange.bind(this),
        disabled: _.isEmpty(subcategoryOptions),
        visible: state.userType === 'provider',
      },
      {
        tag: 'button',
        icon: 'plus',
        width: 2,
        onClick: this.handleAddCategoryClick.bind(this),
        disabled: false,
        visible: state.userType === 'provider',
      },
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
          <EditForm
            id='singUpForm'
            fields={formFields}
            onSubmit={this.handleSubmit.bind(this)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='singUpForm' icon='checkmark' labelPosition='right' content='Далее'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleUserTypeSelectChange(event, target) {
    this.setState({userType: target.value})
  }

  handleAddCategoryClick(event, target) {
    debugger;
  }

  handleSelectChange(event, field) {
    this.setState({[field.name]: field.value})
  }

  handleSubmit(event) {
    const {onSubmit} = this.props
    const form = event.target;

    onSubmit(form);
  }
}

export default SignUpModal
