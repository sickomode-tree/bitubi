import React, {Component} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import {Button, Dimmer, Grid, Image, Modal, Reveal} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import EditForm from 'components/EditForm/EditForm'
import {getUserType} from 'utils/auth'
import {rootUrl} from 'utils/fetch'

class ProfileEditModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    user: PropTypes.object.isRequired,
    cities: PropTypes.array.isRequired,
    fetchCities: PropTypes.func.isRequired,
    updateUserpic: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    city: '',
    district: '',
    phoneNumber: '',
    userpic: '',
  }

  componentDidMount() {
    const {fetchCities} = this.props

    fetchCities()
  }

  render() {
    const {user, cities, trigger, updateUserpic, onClose} = this.props
    const {state} = this

    const cityOptions = cities.map(city => ({value: city.id, text: city.name}))
    const cityValue = state.city || (user && user.city ? user.city.id : null)
    const districts = (cities.length && !_.isNil(cityValue)) ? cities.find(city => city.id === cityValue).districts : []
    const districtOptions = districts.map(district => ({value: district.id, text: district.name}))
    const districtValue = state.district || (user && user.district ? user.district.id : null)

    const formFields = [
      {tag: 'input', type: 'text', name: 'login', title: 'Логин', required: true, path: 'login', width: 16},
      {
        tag: 'input',
        type: 'text',
        name: 'firstName',
        title: 'Имя',
        required: true,
        path: 'firstName',
        visible: getUserType() === 'customer',
        width: 8
      },
      {
        tag: 'input',
        type: 'text',
        name: 'lastName',
        title: 'Фамилия',
        required: true,
        path: 'lastName',
        visible: getUserType() === 'customer',
        width: 8
      },
      {
        tag: 'input',
        type: 'text',
        name: 'providerName',
        title: 'Название компании',
        required: true,
        path: 'providerName',
        visible: getUserType() === 'provider'
      },
      {tag: 'input', type: 'text', name: 'email', title: 'Email', required: true, path: 'email'},
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
      {
        tag: 'input',
        type: 'text',
        name: 'address',
        title: 'Адрес',
        required: getUserType() === 'provider',
        path: 'address'
      },
      {
        tag: 'input',
        type: 'tel',
        name: 'phoneNumber',
        title: 'Телефон',
        required: getUserType() === 'provider',
        path: 'phoneNumber'
      },
      {tag: 'input', type: 'url', name: 'url', title: 'Сайт', path: 'url'},
      {tag: 'input', type: 'hidden', name: 'id', path: 'id'},
    ]

    const userpicUrl = user.photo && (rootUrl + user.photo.original)

    return (
      <Modal
        trigger={trigger || <Button basic>Редактировать</Button>}
        size='large'
        dimmer='blurring'
        closeIcon={true}
        mountNode={document.getElementById('root')}
        onClose={onClose}
      >
        <Modal.Header>Редактировать</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column width={6}>
              <Dropzone
                multiple={false}
                accept='image/jpeg, image/png'
                style={{width: '100%', border: 'none'}}
                onDrop={acceptedFiles => {
                  acceptedFiles.forEach(file => {
                    const reader = new FileReader()

                    reader.onload = () => {
                      const fileAsBinaryString = reader.result

                      this.setState({userpic: fileAsBinaryString})
                      updateUserpic(file)
                    }
                    reader.onabort = () => console.log('file reading was aborted')
                    reader.onerror = () => console.log('file reading has failed')

                    reader.readAsBinaryString(file)
                  })
                }}
              >
                <Reveal animated='small fade'>
                  <Reveal.Content visible style={{width: '100%'}}>
                    <Image
                      wrapped fluid
                      src={state.userpic ? 'data:image/jpeg;base64,' + btoa(state.userpic) : userpicUrl}
                    />
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Dimmer active onClickOutside={() => {

                    }}>
                      Обновить фотографию
                    </Dimmer>
                    <Image
                      wrapped fluid
                      src={state.userpic ? 'data:image/jpeg;base64,' + btoa(state.userpic) : userpicUrl}
                    />
                  </Reveal.Content>
                </Reveal>
              </Dropzone>
            </Grid.Column>
            <Grid.Column width={10}>
              <Modal.Description>
                <EditForm
                  id='profileForm'
                  data={user}
                  fields={formFields}
                  onSubmit={this.handleSubmit.bind(this)}
                />
              </Modal.Description>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='profileForm' icon='checkmark' labelPosition='left' content='Готово'/>
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
    const form = event.target

    onSubmit(form)
  }
}

export default ProfileEditModal
