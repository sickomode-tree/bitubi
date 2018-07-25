import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import {Button, Input, Form, Modal, TextArea} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

class TenderEditModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    categories: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    fetchCities: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchSubcategories: PropTypes.func.isRequired,
    saveTender: PropTypes.func.isRequired,
  }

  state = {
    selectedCity: null,
    category: null,
    selectedDistrict: null,
    subcategory: null,
    expectedDate: null,
  }

  componentDidMount() {
    const {fetchCategories, fetchSubcategories, fetchCities} = this.props

    fetchCategories()
    fetchSubcategories()
    fetchCities()
  }

  render() {
    const {trigger, cities, categories, subcategories} = this.props
    const {selectedCity, category, selectedDistrict, subcategory} = this.state
    const districts = selectedCity ? cities.find(city => city.id === selectedCity).districts : []

    return (
      <Modal
        trigger={trigger || <Button basic color='green'>Создать тендер</Button>}
        size='tiny'
        className='scrolling'
      >
        <Modal.Header>Создать тендер</Modal.Header>
        <Modal.Content>
          <Form
            id='tenderForm'
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Input name='title' label='Название' placeholder='Название' required/>
            <Form.Input name='amount' label='Количество' placeholder='Количество' type='number' required/>
            <Form.Group>
              <Form.Select
                name='selectedCity' label='Город' placeholder='Город'
                options={cities.map(city => ({
                  value: city.id,
                  text: city.name,
                }))}
                value={selectedCity}
                width={8} required
                onChange={this.handleSelectChange.bind(this)}
              />
              <Form.Select
                name='selectedDistrict' label='Район' placeholder='Район'
                options={districts.map(district => ({
                  value: district.id,
                  text: district.name,
                }))}
                disabled={_.isNil(selectedCity) || _.isEmpty(districts)}
                value={selectedDistrict}
                width={8}
                onChange={this.handleSelectChange.bind(this)}
              />
              <input type='hidden' name='city' value={selectedCity}/>
              <input type='hidden' name='district' value={selectedDistrict}/>
            </Form.Group>
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
            <Form.Group>
              <Form.Input name='price' label='Ожидаемая цена' placeholder='Ожидаемая цена' width={8} type='number'/>
              <div className="eight wide field">
                <label>Ожидаемая дата</label>
                <DatePicker
                  minDate={moment()}
                  locale='ru-ru'
                  customInput={
                    <Input fluid>
                      <input placeholder='Ожидаемая дата' name='expectedDate'/>
                    </Input>}
                  selected={this.state.expectedDate}
                  onChange={this.handleDayChange.bind(this)}
                />
              </div>
            </Form.Group>
            <Form.Field
              control={TextArea}
              name='comment'
              label='Комментарий'
              placeholder='Комментарий'
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='tenderForm' icon='checkmark' labelPosition='right' content='Создать'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleSubmit(event) {
    const {saveTender} = this.props
    const form = event.target

    saveTender(form)
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
