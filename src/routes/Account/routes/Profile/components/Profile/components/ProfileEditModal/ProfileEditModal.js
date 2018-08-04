import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {Button, Form, Modal} from 'semantic-ui-react'
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

    const cityOptions = cities.map(city => ({value: city.id, text: city.name}))
    const cityValue = state.city || (profile && profile.city ? profile.city.id : null)
    const districts = cityValue ? cities.find(city => city.id === cityValue).districts : []
    const districtOptions = districts.map(district => ({value: district.id, text: district.name}))
    const districtValue = state.district || (profile && profile.district ? profile.district.id : null)

    const formFields = [
      {tag: 'input', type: 'text'    , name: 'firstName'   , title: 'Имя'                , required: true                        , path: 'firstName'       , visible: getUserType() === 'customer'},
      {tag: 'input', type: 'text'    , name: 'lastName'    , title: 'Фамилия'            , required: true                        , path: 'lastName'        , visible: getUserType() === 'customer'},
      {tag: 'input', type: 'text'    , name: 'providerName', title: 'Название компании'  , required: true                        , path: 'providerName'    , visible: getUserType() === 'provider'},
      {tag: 'input', type: 'text'    , name: 'email'       , title: 'Email'              , required: true                        , path: 'email'          },
      {tag: 'input', type: 'text'    , name: 'login'       , title: 'Логин'              , required: true                        , path: 'login'          },
      {tag: 'input', type: 'password', name: 'password'    , title: 'Пароль'             , required: true                        , path: 'password'       },
      {tag: 'select'                 , name: 'city'        , title: 'Город'              , required: getUserType() === 'provider', value: cityValue        , options: cityOptions       , onChange: this.handleSelectChange.bind(this)},
      {tag: 'select'                 , name: 'district'    , title: 'Район'              , required: !_.isEmpty(districtOptions) , value: districtValue    , options: districtOptions   , onChange: this.handleSelectChange.bind(this) , disabled: _.isEmpty(districtOptions)},
      {tag: 'input', type: 'text'    , name: 'address'     , title: 'Адрес'              , required: getUserType() === 'provider', path: 'address'        },
      {tag: 'input', type: 'tel'     , name: 'phoneNumber' , title: 'Телефон'            , required: getUserType() === 'provider', path: 'phoneNumber'    },
      {tag: 'input', type: 'url'     , name: 'url'         , title: 'Сайт'               , required: getUserType() === 'provider', path: 'url'            },
      {tag: 'input', type: 'hidden'  , name: 'id'                                                                                , path: 'id'             },
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
