import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Modal} from 'semantic-ui-react'
import {getObjectValue} from 'utils/array'
import {getFormFieldComponent} from 'utils/form'
import EditForm from 'components/EditForm/EditForm'

class TenderEditModal extends Component {
  static propTypes = {
    tender: PropTypes.object,
    trigger: PropTypes.node,
    categories: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    fetchCities: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func,
  }

  state = {
    city: null,
    category: null,
    district: null,
    subcategory: null,
    expectedDate: null,
  }

  componentDidMount() {
    const {fetchCategories, fetchCities} = this.props

    fetchCategories()
    fetchCities()
  }

  render() {
    const {tender, trigger, cities, categories, onClose} = this.props
    const {state} = this
    const cityOptions = cities.map(city => ({value: city.id, text: city.name}))
    const cityValue = state.city || (tender ? tender.city.id : null)
    const districts = cityValue ? cities.find(city => city.id === cityValue).districts : []
    const districtOptions = districts.map(district => ({value: district.id, text: district.name}))
    const districtValue = state.district || (tender ? tender.district.id : null)
    const categoryOptions = categories.map(category => ({value: category.id, text: category.title}))
    const categoryValue = state.category || (tender ? tender.category.id : null)
    const category = categories.find(category => category.id === categoryValue)
    const subcategories = (categoryValue && category) ? category.children : []
    const subcategoryOptions = subcategories.map(subcategory => ({value: subcategory.id, text: subcategory.title}))
    const subcategoryValue = state.subcategory || (tender ? tender.subcategory.id : null)
    const commentValue = state.comment || (tender ? tender.comment : null)
    const expectedDateValue = state.expectedDate || (tender ? tender.expectedDate : null)
    // TODO: move the following config to Tenders and pass it to all modals. then remove this file

    const formFields = [
      {tag: 'input', type: 'text'  , name: 'title'       , title: 'Название'           , required: true                       , path: 'title' }        ,
      {tag: 'input', type: 'number', name: 'amount'      , title: 'Количество, шт'     , required: true                       , path: 'amount'}        ,
      {tag: 'select'               , name: 'city'        , title: 'Город'              , required: true                       , value: cityValue       , options: cityOptions       , onChange: this.handleSelectChange.bind(this) , width: 8},
      {tag: 'select'               , name: 'district'    , title: 'Район'              , required: !_.isEmpty(districtOptions), value: districtValue   , options: districtOptions   , onChange: this.handleSelectChange.bind(this) , width: 8 , disabled: _.isEmpty(districtOptions)},
      {tag: 'select'               , name: 'category'    , title: 'Категория'          , required: true                       , value: categoryValue   , options: categoryOptions   , onChange: this.handleSelectChange.bind(this) , width: 8},
      {tag: 'select'               , name: 'subcategory' , title: 'Подкатегория'       , required: true                       , value: subcategoryValue, options: subcategoryOptions, onChange: this.handleSelectChange.bind(this) , width: 8 , disabled: _.isEmpty(subcategoryOptions)},
      {tag: 'datepicker'           , name: 'expectedDate', title: 'Ожидаемая дата'     , required: true                       , value: expectedDateValue                            , onChange: this.handleDayChange.bind(this)    , width: 8},
      {tag: 'input', type: 'number', name: 'price'       , title: 'Ожидаемая цена, руб', required: true                       , path: 'price'                                                                                      , width: 8},
      {tag: 'textarea'             , name: 'comment'     , title: 'Комментарий'        , value: commentValue},
      {tag: 'input', type: 'hidden', name: 'id'                                                                               , path: 'id' }        ,
    ]

    return (
      <Modal
        trigger={trigger || <Button basic color='green'>Создать тендер</Button>}
        size='tiny'
        dimmer='blurring'
        onClose={!_.isNil(onClose) ? onClose : null}
      >
        <Modal.Content>
          <EditForm
            id='tenderForm'
            data={tender}
            fields={formFields}
            onSubmit={this.handleSubmit.bind(this)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='tenderForm' content='Сохранить'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleSubmit(event) {
    const {onSubmit} = this.props
    const form = event.target

    onSubmit(form)
    browserHistory.push(window.location.pathname)
  }

  handleSelectChange(event, field) {
    this.setState({[field.name]: field.value})
  }

  handleDayChange(day) {
    this.setState({expectedDate: day});
  }
}

export default TenderEditModal
