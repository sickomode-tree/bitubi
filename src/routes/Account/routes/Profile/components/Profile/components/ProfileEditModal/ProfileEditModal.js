import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {Button, Form, Modal} from 'semantic-ui-react'
import MaskedInput from 'react-text-mask'
import EditForm from 'components/EditForm/EditForm'
import {getUserType} from 'utils/auth'

class ProfileEditModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    categories: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    fetchCities: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    category: '',
    subcategory: '',
    city: '',
    district: '',
    phoneNumber: '',
  }

  componentDidMount() {
    const {fetchCities} = this.props

    fetchCities()
  }

  render() {
    const {profile, cities, trigger, onClose} = this.props
    const {state} = this
    const {phoneNumber} = state

    const cityOptions = cities.map(city => ({value: city.id, text: city.name}))
    const cityValue = state.city || (profile && profile.city ? profile.city.id : null)
    const districts = cityValue ? cities.find(city => city.id === cityValue).districts : []
    const districtOptions = districts.map(district => ({value: district.id, text: district.name}))
    const districtValue = state.district || (profile && profile.district ? profile.district.id : null)

    const formFields = [
      {tag: 'input', type: 'text'    , name: 'firstName'   , title: 'Имя'                , required: true                        , path: 'firstName'      , visible: getUserType() === 'customer'},
      {tag: 'input', type: 'text'    , name: 'lastName'    , title: 'Фамилия'            , required: true                        , path: 'lastName'       , visible: getUserType() === 'customer'},
      {tag: 'input', type: 'text'    , name: 'providerName', title: 'Название компании'  , required: true                        , path: 'providerName'   , visible: getUserType() === 'provider'},
      {tag: 'input', type: 'text'    , name: 'email'       , title: 'Email'              , required: true                        , path: 'email'          },
      {tag: 'input', type: 'text'    , name: 'login'       , title: 'Логин'              , required: true                        , path: 'login'          },
      {tag: 'input', type: 'password', name: 'password'    , title: 'Пароль'             , required: true                        , path: 'password'       },
      {tag: 'select'                 , name: 'city'        , title: 'Город'              , required: getUserType() === 'provider', value: cityValue       , options: cityOptions       , onChange: this.handleSelectChange.bind(this)},
      {tag: 'select'                 , name: 'district'    , title: 'Район'              , required: !_.isEmpty(districtOptions) , value: districtValue   , options: districtOptions   , onChange: this.handleSelectChange.bind(this) , disabled: _.isEmpty(districtOptions)},
      {tag: 'input', type: 'hidden'  , name: 'id'                                                                                  , path: 'id' }           ,
    ]

    return (
      <Modal
        trigger={trigger || <Button basic>Редактировать</Button>}
        size='tiny'
        dimmer='blurring'
        onClose={onClose}
      >
        <Modal.Header>Редактировать</Modal.Header>
        <Modal.Content>
          <EditForm
            id='profileForm'
            data={profile}
            fields={formFields}
            onSubmit={this.handleSubmit.bind(this)}
          />
          {/*<Form
            id='registerForm'
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Group>

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
            <Form.Input name='address' label='Адрес' placeholder='Адрес' type='text' required={getUserType() === 'provider'}/>
            {
              getUserType() === 'provider' &&
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
            <Form.Input name='url' label='Сайт' placeholder='http://example.com' type='text'/>
            {
              getUserType() === 'provider' &&
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
          </Form>*/}
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='registerForm' icon='checkmark' labelPosition='right' content='Готово'/>
        </Modal.Actions>
      </Modal>
    )
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

export default ProfileEditModal
