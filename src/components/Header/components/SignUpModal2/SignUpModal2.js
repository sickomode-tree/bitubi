import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Grid, Form, Modal, Tab} from 'semantic-ui-react'
import EditForm from 'components/EditForm/EditForm'
import {getFormFieldComponent} from 'utils/form'

class SignUpForm extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    fields: this.props.fields,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fields: nextProps.fields,
    })
  }

  render() {
    const {state} = this

    return (
      <EditForm
        id='signUpForm'
        fields={state.fields}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }

  handleSubmit(event) {
    const {onSubmit} = this.props
    const form = event.target;

    onSubmit(form);
  }
}

export default class SignUpModal2 extends Component {
  static propTypes = {
    cities: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    activeTab: 0,
    city: '',
    district: '',
    phoneNumber: '',
  }

  componentDidMount() {
    const {fetchCategories, fetchCities} = this.props

    fetchCategories()
    fetchCities()
  }


  render() {
    const {cities, categories, trigger, onClose, onSubmit} = this.props
    const {state} = this
    const cityOptions = cities.map(city => ({value: city.id, text: city.name}))
    const cityValue = state.city
    const districts = cityValue ? cities.find(city => city.id === cityValue).districts : []
    const districtOptions = districts.map(district => ({value: district.id, text: district.name}))
    const districtValue = state.district
    const categoryOptions = categories.map(category=> ({value: category.id, text: category.title}))
    const category1Value = state.category_1
    const category2Value = state.category_2
    const category3Value = state.category_3
    const subcategories1 = category1Value ? categories.find(category => category.id === category1Value).children : []
    const subcategories2 = category2Value ? categories.find(category => category.id === category2Value).children : []
    const subcategories3 = category3Value ? categories.find(category => category.id === category3Value).children : []
    const subcategory1Options = subcategories1.map(subcategory => ({value: subcategory.id, text: subcategory.title}))
    const subcategory2Options = subcategories2.map(subcategory => ({value: subcategory.id, text: subcategory.title}))
    const subcategory3Options = subcategories3.map(subcategory => ({value: subcategory.id, text: subcategory.title}))

    // const categoryFields = state.categories.map((categoryId, index) => {
    //   subcategoryId = state.subCategories[index]
    //   subcategories = categories.find(category => category.id === categoryId)
    //
    //   if (subcategories !== undefined) {
    //     subcategoryOptions = subcategories.children.map(subcategory => ({value: subcategory.id, text: subcategory.title}))
    //   } else {
    //     subcategoryOptions = []
    //   }
    //
    //   return [
    //     {tag: 'select', name: 'category_' + index, title: 'Категория', required: true, value: categoryId, options: categoryOptions, width: 7, onChange: this.handleSelectChange.bind(this), visible: state.activeTab === 1},
    //     {tag: 'select', name: 'subcategory_' + index, title: 'Подкатегория', required: true, value: subcategoryId, options: subcategoryOptions, width: 7, multiple: true, onChange: this.handleSelectChange.bind(this), visible: state.activeTab === 1},
    //     {tag: 'button', icon: 'plus', width: 2, visible: state.activeTab === 1, onClick: () => {
    //
    //     this.setState({
    //
    //     })
    //   }},
    // ]})[0]

    let fields = [
      {tag: 'input', name: 'login', title: 'Логин', required: true, width: 8},
      {tag: 'input', type: 'password', name: 'password', title: 'Пароль', required: true, width: 8},
      {tag: 'input', name: 'firstName', title: 'Имя', required: true, visible: state.activeTab === 0, width: 8},
      {tag: 'input', name: 'lastName', title: 'Фамилия', required: true, visible: state.activeTab === 0, width: 8},
      {tag: 'input', name: 'providerName', title: 'Название компании', required: true, visible: state.activeTab === 1},
      {tag: 'input', type: 'text', name: 'email', title: 'Email', required: true, width: 8},
      {tag: 'input', type: 'tel', name: 'phoneNumber', title: 'Телефон', value: state.phoneNumber, required: state.activeTab === 1, width: 8},
      {tag: 'select', name: 'city', title: 'Город', required: true, value: cityValue, options: cityOptions, width: 8, onChange: this.handleSelectChange.bind(this)},
      {tag: 'select', name: 'district', title: 'Район', required: !_.isEmpty(districtOptions), value: districtValue, options: districtOptions, width: 8, onChange: this.handleSelectChange.bind(this), disabled: _.isEmpty(districtOptions)},
      {tag: 'input', type: 'text', name: 'address', title: 'Адрес', required: state.activeTab === 1},
      // ...categoryFields,
      {tag: 'select', name: 'category_1', title: 'Категория', required: true, value: state.category_1, options: categoryOptions, width: 8, onChange: this.handleSelectChange.bind(this), visible: state.activeTab === 1},
      {tag: 'select', name: 'subcategory_1', title: 'Подкатегории', required: true, value: state.subcategory_1, options: subcategory1Options, width: 8, multiple: true, onChange: this.handleSelectChange.bind(this), visible: state.activeTab === 1},
      {tag: 'select', name: 'category_2', title: 'Категория', required: true, value: state.category_2, options: categoryOptions, width: 8, onChange: this.handleSelectChange.bind(this), visible: state.activeTab === 1},
      {tag: 'select', name: 'subcategory_2', title: 'Подкатегории', required: true, value: state.subcategory_2, options: subcategory2Options, width: 8, multiple: true, onChange: this.handleSelectChange.bind(this), visible: state.activeTab === 1},
      {tag: 'select', name: 'category_3', title: 'Категория', required: true, value: state.category_3, options: categoryOptions, width: 8, onChange: this.handleSelectChange.bind(this), visible: state.activeTab === 1},
      {tag: 'select', name: 'subcategory_3', title: 'Подкатегории', required: true, value: state.subcategory_3, options: subcategory3Options, width: 8, multiple: true, onChange: this.handleSelectChange.bind(this), visible: state.activeTab === 1},
      {tag: 'input', type: 'hidden', name: 'userType', value: this.props.userType}
    ]

    const panes = [
      {menuItem: 'Покупатель', render: () => <Tab.Pane attached={false} basic><SignUpForm fields={fields} onSubmit={onSubmit}/></Tab.Pane>},
      {menuItem: 'Поставщик', render: () => <Tab.Pane attached={false} basic><SignUpForm fields={fields} onSubmit={onSubmit}/></Tab.Pane>},
    ]

    console.log(this.state)

    return (
      <Modal
        trigger={trigger || <Button basic color='green'>Зарегистрироваться</Button>}
        size='tiny'
        dimmer='blurring'
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
        <Modal.Actions>
          <Button positive type='submit' form='signUpForm' icon='checkmark' labelPosition='left' content='Далее'/>
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

  handleAddCategoryClick(event, target) {
    if (this.state.categoryCount < 3) {
      this.setState({
        categoryCount: this.state.categoryCount + 1
      })
    }
  }
}
