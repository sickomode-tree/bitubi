import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Modal, TextArea} from 'semantic-ui-react'
import {browserHistory} from "react-router";

class TenderFormModal extends Component {
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
    city: null,
    category: null,
    subcategory: null,
  }

  componentDidMount() {
    const {fetchCategories, fetchSubcategories, fetchCities} = this.props

    fetchCategories()
    fetchSubcategories()
    fetchCities()
  }

  render() {
    const {trigger, cities, categories, subcategories} = this.props
    const {city, category, subcategory} = this.state

    return (
      <Modal
        trigger={trigger || <Button basic color='green'>Создать тендер</Button>}
        size='tiny'
        className='scrolling'
        style={{height: 'fit-content'}}
      >
        <Modal.Header>Создать тендер</Modal.Header>
        <Modal.Content>
          <Form
            id='tenderForm'
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Input name='title' label='Название' placeholder='Название' required/>
            <Form.Input name='amount' label='Количество' placeholder='Количество' type='number' required/>
            <Form.Select
              name='city' label='Город'
              options={cities.map(city => ({
                value: city.id,
                text: city.name,
              }))}
              value={city}
              placeholder='Город' required
              onChange={this.handleSelectChange.bind(this)}
            />
            <input type='hidden' name='city' value={city}/>
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
              <Form.Input name='endDate' label='Ожидаемая дата' placeholder='Ожидаемая дата' width={8}/>
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
}

export default TenderFormModal
