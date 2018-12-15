import React, {Component} from 'react'
import {Link} from 'react-router'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Checkbox, Modal, Tab} from 'semantic-ui-react'
import SignUpForm from './components/SignUpForm/SignUpForm'

export default class SignUpModal extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    trigger: PropTypes.node,
  }

  state = {
    activeTab: 0,
    city: '',
    tariff: 3,
    district: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    category_1: '',
    category_2: '',
    category_3: '',
    subcategory_1: '',
    subcategory_2: '',
    subcategory_3: '',
    agreedToTerms: false,
  }

  componentDidMount () {
    const { fetchCategories, fetchCities } = this.props

    fetchCategories()
    fetchCities()
  }

  render () {
    const { cities, categories, trigger, onClose, onSubmit } = this.props
    const { state } = this
    const userType = state.activeTab === 0 ? 'customer' : 'provider'
    const cityOptions = cities.map(city => ({value: city.id, text: city.name}))
    const cityValue = state.city
    const districts = cityValue ? cities.find(city => city.id === cityValue).districts : []
    const districtOptions = districts.map(district => ({value: district.id, text: district.name}))
    const districtValue = state.district
    const categoryOptions = categories.map(category => ({value: category.id, text: category.title}))
    const category1Value = state.category_1
    const category2Value = state.category_2
    const category3Value = state.category_3
    const tariffOptions = [{ value: 1, text: '1 месяц, 3000руб'}, {value: 2, text: '3 месяца, 2600/мес' }, {
      value: 3,
      text: '6 месяцев, 2300/мес.'
    }]
    const tariffValue = state.tariff
    const subcategories1 = category1Value ? categories.find(category => category.id === category1Value).children : []
    const subcategories2 = category2Value ? categories.find(category => category.id === category2Value).children : []
    const subcategories3 = category3Value ? categories.find(category => category.id === category3Value).children : []
    const subcategory1Options = subcategories1.map(subcategory => ({ value: subcategory.id, text: subcategory.title }))
    const subcategory2Options = subcategories2.map(subcategory => ({ value: subcategory.id, text: subcategory.title }))
    const subcategory3Options = subcategories3.map(subcategory => ({ value: subcategory.id, text: subcategory.title }))

    let fields = [
      {
        tag: 'select',
        name: 'tariff',
        title: 'Тариф',
        required: true,
        value: tariffValue,
        options: tariffOptions,
        onChange: this.handleSelectChange.bind(this),
        visible: state.activeTab === 1,
      },
      { tag: 'input', name: 'login', title: 'Логин', required: true },
      { tag: 'input', type: 'password', name: 'password', title: 'Пароль', required: true, width: 8 },
      {
        tag: 'input',
        type: 'password',
        name: 'passwordConfirm',
        title: 'Подтвердите пароль',
        required: true,
        width: 8
      },
      {
        tag: 'input',
        name: 'firstName',
        title: 'Имя',
        required: true,
        value: state.firstName,
        visible: state.activeTab === 0,
        width: 8
      },
      {
        tag: 'input',
        name: 'lastName',
        title: 'Фамилия',
        required: true,
        value: state.lastName,
        visible: state.activeTab === 0,
        width: 8
      },
      {
        tag: 'input',
        type: 'email',
        name: 'email',
        title: 'Email',
        value: state.email,
        required: true,
        width: 8
      },
      {
        tag: 'input',
        type: 'tel',
        name: 'phoneNumber',
        title: 'Телефон',
        value: state.phoneNumber,
        required: true,
        width: 8
      },
      {
        tag: 'select',
        name: 'city',
        title: 'Город',
        required: true,
        value: cityValue,
        options: cityOptions,
        width: 8,
        onChange: this.handleSelectChange.bind(this)
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
      { tag: 'input', name: 'address', title: 'Адрес', required: state.activeTab === 1 },
      {
        tag: 'input',
        name: 'providerName',
        title: 'Название компании',
        required: true,
        visible: state.activeTab === 1
      },
      { tag: 'input', name: 'providerTaxId', title: 'ИНН', required: true, visible: state.activeTab === 1 },
      {
        tag: 'select',
        name: 'category_1',
        title: 'Категория',
        required: true,
        value: state.category_1,
        options: categoryOptions,
        width: 8,
        onChange: this.handleSelectChange.bind(this),
        visible: state.activeTab === 1
      },
      {
        tag: 'select',
        name: 'subcategory_1',
        title: 'Подкатегории',
        required: true,
        value: state.subcategory_1,
        options: subcategory1Options,
        width: 8,
        multiple: true,
        onChange: this.handleSelectChange.bind(this),
        visible: state.activeTab === 1
      },
      {
        tag: 'select',
        name: 'category_2',
        title: 'Категория',
        required: true,
        value: state.category_2,
        options: categoryOptions,
        width: 8,
        onChange: this.handleSelectChange.bind(this),
        visible: state.activeTab === 1
      },
      {
        tag: 'select',
        name: 'subcategory_2',
        title: 'Подкатегории',
        required: true,
        value: state.subcategory_2,
        options: subcategory2Options,
        width: 8,
        multiple: true,
        onChange: this.handleSelectChange.bind(this),
        visible: state.activeTab === 1
      },
      {
        tag: 'select',
        name: 'category_3',
        title: 'Категория',
        required: true,
        value: state.category_3,
        options: categoryOptions,
        width: 8,
        onChange: this.handleSelectChange.bind(this),
        visible: state.activeTab === 1
      },
      {
        tag: 'select',
        name: 'subcategory_3',
        title: 'Подкатегории',
        required: true,
        value: state.subcategory_3,
        options: subcategory3Options,
        width: 8,
        multiple: true,
        onChange: this.handleSelectChange.bind(this),
        visible: state.activeTab === 1
      },
      {tag: 'input', type: 'hidden', name: 'userType', value: userType},
    ]

    const panes = [
      {
        menuItem: 'Покупатель',
        render: () => <Tab.Pane attached={false} basic><SignUpForm fields={fields} onSubmit={onSubmit} /></Tab.Pane>
      },
      {
        menuItem: 'Поставщик',
        render: () => <Tab.Pane attached={false} basic><SignUpForm fields={fields} onSubmit={onSubmit} /></Tab.Pane>
      },
    ]

    return (
      <Modal
        trigger={trigger || <Button circular color='green'>Зарегистрироваться</Button>}
        size='tiny'
        dimmer='blurring'
        closeIcon
        mountNode={document.getElementById('root')}
        onClose={onClose}
      >
        <Modal.Header>Зарегистрироваться</Modal.Header>
        <Modal.Content>
          <Tab
            menu={{attached: false, fluid: true, size: 'tiny', widths: 2}}
            panes={panes}
            activeIndex={state.activeTab}
            onTabChange={this.handleTabChange.bind(this)}
          />
        </Modal.Content>
        <Modal.Actions style={{display: 'flex'}}>
          <Checkbox
            label={{
              children: (
                <div>Я прочитал/а и принимаю <a href={'/terms'} target={'_blank'} style={{textDecoration: 'underline'}}
                                                title={'Пользовательское соглашение'}>пользовательское
                  соглашение</a> и <a href={'/policy'} target={'_blank'} style={{textDecoration: 'underline'}}
                                      title={'Политика конфиденциальности'}>политику
                  конфиденциальности</a></div>
              )
            }}
            defaultValue={this.state.agreedToTerms}
            onChange={this.handleCheckboxChange.bind(this)}
          />
          <Button
            circular
            positive
            disabled={!this.state.agreedToTerms}
            type='submit'
            form='signUpForm'
            content='Далее'
          />
        </Modal.Actions>
      </Modal>
    )
  }

  handleTabChange(event, {activeIndex}) {
    this.setState({activeTab: activeIndex})
  }

  handleSelectChange(event, field) {
    this.setState({[field.name]: field.value})
  }

  handleCheckboxChange(event) {
    this.setState({agreedToTerms: !this.state.agreedToTerms})
  }
}
